import pickle
from pydantic import BaseModel
from fastapi import FastAPI
import os
from starlette.middleware.cors import CORSMiddleware

# import uvicorn

app = FastAPI()
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_headers=["*"], allow_methods=["*"],
)

print(os.getcwd())
print(os.listdir("/app"))

clf = pickle.load(open("/app/models/linearsvc1/clf.pickle", "rb"))
count_vect = pickle.load(open("/app/models/linearsvc1/count_vect.pickle", "rb"))


class Data(BaseModel):
    tweet: str


@app.post("/predict")
def predict(data: Data):
    data_dict = data.dict()
    answer = clf.predict(count_vect.transform([data_dict["tweet"]]))
    return {"prediction": str(answer[0])}
