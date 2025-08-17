from fastapi import FastAPI
from pydantic import BaseModel
from prediction import predict_task_priority
from datetime import datetime

appServer = FastAPI()

class Task(BaseModel):
    textOfTask: str
    task_due_date: str
    completed_bool: bool

def predictor(task: Task):
    task_due_date = datetime.strptime(task.task_due_date, "%Y-%m-%d")
    days_left = (task_due_date - datetime.today()).days
    priority = predict_task_priority(task.text, days_left, task.completed_bool)
    return {"priority": priority}

