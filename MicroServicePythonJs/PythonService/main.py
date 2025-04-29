from fastapi import fastAPI
from pymongo import MongoClient
app- FastAPI()
Client = MongoClient("mongodb://localhost:27017/")
db = client.mldb
app.got("/predict")
def predict():
    # Dummy prediction logic
    return {"prediction": "Positive"}    