import pickle
from pydantic import BaseModel
from fastapi import FastAPI
import os
from starlette.middleware.cors import CORSMiddleware
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import load_model




# import uvicorn

app = FastAPI()
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_headers=["*"], allow_methods=["*"],
)

print(os.getcwd())
print(os.listdir("/app"))

model = load_model("/app/models/lstm/model.h5")
vector = pickle.load(open("/app/models/linearsvc1/clf.pickle", "rb"))


class Data(BaseModel):
    tweet: str


@app.post("/predict")
def predict(data: Data):
    data_dict = data.dict()
    input_string = []
    input_string.append(data_dict["tweet"])
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(vector)
    sequences = tokenizer.texts_to_sequences(input_string)
    X_processed = pad_sequences(sequences, padding='post', maxlen=48)
    score = model.predict(X_processed)
    
    return {"prediction": str(score)}
    
