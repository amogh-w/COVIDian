import pickle
import os
import datetime
import pymongo
import pandas as pd
import numpy as np
from subprocess import call
from tqdm import tqdm
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

df = pd.read_csv("./india_info.csv")
india_info = df[["state", "city"]]
bash_command_list = []

for i, row in india_info.iterrows():
    state, city = row["state"], row["city"]
    temp = "twint -s 'Unlock1 AND {}' -o 'output/{}--{}.csv' --csv --since '2020-7-1 00:00:00'".format(
        city, state, city
    )
    bash_command_list.append(temp)

file_temp = open("bash_command_list.txt", "w")
file_temp.writelines(bash_command_list)
file_temp.close()

for bash_command in bash_command_list:
    call(bash_command, shell=True)

scrapped_data = os.listdir("./output/")

output_df = pd.DataFrame()

for file in scrapped_data:
    file_df = pd.read_csv("output/{}".format(file))

    temp = file.split(".")[0].split("--")
    state, city = temp[0], temp[1]

    file_df["state"] = state
    file_df["city"] = city

    output_df = output_df.append(file_df)

output_df = output_df.reset_index()

df_to_work_with = output_df[["tweet", "link", "date", "time", "state", "city"]]

model = load_model("./model/model_v6.h5")
tokenizer = pickle.load(open("./model/tokenizer_v6.pickle", "rb"))

score_list = ["anger", "happiness", "neutral", "sadness", "worry"]


def analyze(tweet):
    sequences = tokenizer.texts_to_sequences([row["tweet"]])
    new_processed = pad_sequences(sequences, padding="post", maxlen=30)
    return model.predict(new_processed)


output = pd.DataFrame()

for index, row in tqdm(
    df_to_work_with[["date", "time", "tweet", "link", "state", "city"]].iterrows()
):

    if index % 20 == 0:
        print("At Index: {}".format(index))

    date = row["date"]
    time = row["time"]

    date_time = date + " " + time
    date_time = datetime.datetime.strptime(date_time, "%Y-%m-%d %H:%M:%S")

    tweet = row["tweet"]
    link = row["link"]
    state = row["state"]
    city = row["city"]

    score = analyze(tweet)

    anger = score[0][0]
    happiness = score[0][1]
    neutral = score[0][2]
    sadness = score[0][3]
    worry = score[0][4]

    result = {
        "date_time": date_time,
        "tweet": tweet,
        "link": link,
        "state": state,
        "city": city,
        "anger": anger,
        "happiness": happiness,
        "neutral": neutral,
        "sadness": sadness,
        "worry": worry,
    }

    output = output.append(result, ignore_index=True)

output[
    [
        "date_time",
        "tweet",
        "link",
        "state",
        "city",
        "anger",
        "happiness",
        "neutral",
        "sadness",
        "worry",
    ]
].to_csv("{}-backup.csv".format(datetime.date.today()))

mongo_url = os.environ.get("mongo_url")
myclient = pymongo.MongoClient(os.getenv("covidian_server_internal_mongo_url"))
mydb = myclient["covidian"]

mycol = mydb["sentiments"]
df_for_sentiments = output[
    [
        "date_time",
        "tweet",
        "link",
        "state",
        "city",
        "anger",
        "happiness",
        "neutral",
        "sadness",
        "worry",
    ]
]
for i, row in df_for_sentiments.iterrows():
    mycol.insert_one(dict(row))

# CITY

mycol = mydb["sentiments_city"]
df_for_sentiments_city = (
    output[
        [
            "date_time",
            "tweet",
            "link",
            "state",
            "city",
            "anger",
            "happiness",
            "neutral",
            "sadness",
            "worry",
        ]
    ]
    .groupby(["state", "city"], as_index=False)
    .mean()
)
for i, row in df_for_sentiments_city.iterrows():
    mycol.insert_one(dict(row))

# STATE

mycol = mydb["sentiments_state"]
df_for_sentiments_state = (
    output[
        [
            "date_time",
            "tweet",
            "link",
            "state",
            "city",
            "anger",
            "happiness",
            "neutral",
            "sadness",
            "worry",
        ]
    ]
    .groupby(["state"], as_index=False)
    .mean()
)
for i, row in df_for_sentiments_state.iterrows():
    mycol.insert_one(dict(row))

# COUNTRY

mycol = mydb["sentiments_country"]
df_for_sentiments_country = output[
    [
        "date_time",
        "tweet",
        "link",
        "state",
        "city",
        "anger",
        "happiness",
        "neutral",
        "sadness",
        "worry",
    ]
].mean()
sentiments_country = dict()
sentiments_country["country"] = "India"
sentiments_country.update(df_for_sentiments_country.to_dict())
mycol.insert_one(sentiments_country)
