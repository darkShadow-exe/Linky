import pickle
import gradio as gr

# Load the model and vectorizer
with open("models/model.pkl", "rb") as f:
    model = pickle.load(f)

with open("models/tfidf_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

print("Model and vectorizer loaded successfully!")

# Define the prediction function
def predict_url(user_url):
    try:
        vect = vectorizer.transform([user_url])
        result = model.predict(vect)[0]
        return 0 if result == "bad" else 1
    except Exception as e:
        return f"Error: {e}"

# Gradio interface
iface = gr.Interface(
    fn=predict_url,
    inputs=gr.Textbox(label="Enter a URL"),
    outputs="text",
    title="Linky - Safe/Unsafe URL Predictor",
    description="Enter a URL to classify it as Safe or Unsafe."
)

# Run
iface.launch()
