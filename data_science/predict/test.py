import requests

to_predict_dict = {'tweet': 'i am happy'}

url = "http://127.0.0.1:8000/predict"
r = requests.post(url, json=to_predict_dict)

print(r.json())
