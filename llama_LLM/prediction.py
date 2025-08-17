from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

model_name = "meta_llama/Llama-2-7b-hf"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, device_map="auto")

def predict_task_priority(task_text, days_left, complete_bool):
    prompt = f"""
Task: {task_text}
Days Left: {days_left}
Completion Value: {"Yes" if complete_bool else "No"}
Priority:
"""

    inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
    outputs = model.generate(**inputs, max_new_tokens=10)
    decoded = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()
    

