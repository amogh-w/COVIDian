import pickle
from pydantic import BaseModel
from fastapi import FastAPI
import os
from starlette.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np

maxLen = 30
padding = 'post'
truncating = 'post'

app = FastAPI()
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_headers=["*"], allow_methods=["*"],
)

model = load_model("/app/models/lstm/model_v6.h5")
tokenizer = pickle.load(open("/app/models/lstm/tokenizer_v6.pickle", "rb"))


class Data(BaseModel):
    tweet: str


score_list = ["Anger", "Happiness", "Neutral", "Sadness", "Worry"]


@app.post("/predict")
def predict(data: Data):
    data_dict = data.dict()
    input_string = []
    input_string.append(data_dict["tweet"])
    sequences = tokenizer.texts_to_sequences(input_string)
    X_processed = pad_sequences(sequences, padding="post", maxlen=30)
    score = model.predict(X_processed)
    maximum = max(score[0])*100
    return {"prediction": str(score_list[np.argmax(score)] + ' ' + format(maximum, '.2f') + '%')}
