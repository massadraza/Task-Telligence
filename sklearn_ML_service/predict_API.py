from fastapi import FastAPI
from pydantic import BaseModel
import joblib 
from datetime import datetime

app = FastAPI()
model = joblib.load("task_priority_model.pkl")

class Task(BaseModel):
    text: str
    dueDate: str
    completed: bool

@app.post("/predict")
def predict_priority(task: Task):
    days_left = (datetime.strptime(task.dueDate, "%Y-%m-%d").date() - datetime.today().date()).days
    features = [[len(task.text), days_left, int(task.completed)]]
    priority = model.predict(features)[0]
    return {"priority": priority}
