# Task-Telligence
The objective of this application is to help people who struggle with task management and those who decide to put off tasks/assignments till the very last minute (in other words, procrastination).
My attempt to solve this problem is designing a full stack web application that lets users input tasks, due dates, and uses a RandomForestClassifier Model to predict the priority of the task.
This helps students, whether in high school or college, determine which tasks they should complete first and which tasks can be put off for later.

# Tech Stack

Frontend: Javascript, React, TailwindCSS <br>
Backend: NodeJS, ExpressJS, MongoDB, FastAPI <br>
AI: Sklearn, Pandas, Joblib <br>

# How to Run the Application

### 1. Clone the Repository

```bash
git clone https://github.com/massadraza/Task-Telligence.git
cd Task-Telligence
```
### 2. Set up the Backend
```bash
cd backend
npm install
npm start
```

### 3. Set up the Frontend
```bash
cd frontend
npm install
npm start
```

### 4. Run the FastAPI AI Python Server
```
cd ../sklearn_ML_service
pip install -r requirements.txt
python predict_API.py
```



