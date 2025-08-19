from fastapi import FastAPI
from pydantic import BaseModel
import pickle

with open("priority_model.pkl", "rb") as f:
    model = pickle.load(f)

app = FastAPI()

class Task(BaseModel):
    text: str
    dueDate: str
    completed: bool

@app.post("/predict")
def predict_priority(task: Task):
    features = [[task.days_left, int(task.completed)]]
    prediction = model.predict(features)
    return {"priority": prediction[0]}