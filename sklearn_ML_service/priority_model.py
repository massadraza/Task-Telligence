from sklearn.ensemble import RandomForestClassifier
import pandas as pd
import joblib 

"""
Training the model. 
The data set format is [length of text, days left, and completed (0, not complete and 1 complete)]

"""
dataSet = {
    "text_length": [10, 50, 100, 20, 5, 80, 60, 15],
    "days_left":   [1, 10, 20, 3, 0, 15, 30, 2],
    "completed":   [0, 0, 0, 1, 1, 0, 0, 0],
    "priority":    ["high", "medium", "low", "high", "low", "medium", "low", "high"]
}

df = pd.DataFrame(dataSet)

X = df[["text_length", "days_left", "completed"]]
y = df["priority"]

clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X, y)

joblib.dump(clf, "task_priority_model.pkl")
print("Your model was successfully trained and saved as the file name --> task_priority_model.pkl")