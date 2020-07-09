import pickle
from pydantic import BaseModel
from fastapi import FastAPI
import os
from starlette.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np

# import uvicorn

app = FastAPI()
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_headers=["*"], allow_methods=["*"],
)

# print(os.getcwd())
# print(os.listdir("/app"))

# model = pickle.load(open("/app/models/lstm/model_amogh.pickle", "rb",))
model = load_model(
    "/Users/amogh/Documents/Study/twitter/data_science/predict/models/lstm/model.h5"
)
# model = load_model("/app/models/lstm/model.h5")
# tokenizer = pickle.load(open("/app/models/lstm/tokenizer.pickle", "rb"))
tokenizer = pickle.load(
    open(
        "/Users/amogh/Documents/Study/twitter/data_science/predict/models/lstm/tokenizer.pickle",
        "rb",
    )
)
# tokenizer = pickle.load(open("/app/models/lstm/tokenizer.pickle", "rb",))


class Data(BaseModel):
    tweet: str


score_list = ["anger", "happiness", "neutral", "sadness", "worry"]


@app.post("/predict")
def predict(data: Data):
    data_dict = data.dict()
    input_string = []
    input_string.append(data_dict["tweet"])
    sequences = tokenizer.texts_to_sequences(input_string)
    X_processed = pad_sequences(sequences, padding="post", maxlen=48)
    score = model.predict(X_processed)
    return {"prediction": score_list[np.argmax(score)]}
