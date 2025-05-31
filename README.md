# Linky

Linky is a lightweight and easy-to-use phishing link detector built for quick and efficient URL safety checks. It helps users identify potentially malicious or suspicious links before clicking on them.

## Features

✅ Detects phishing and malicious URLs

⚡ Fast and simple interface

🧠 Uses Linear Regression to classify links

🗂️ Can be integrated into other tools or workflows

## How it works

1. **Data Collection & Preprocessing**: The model is trained on a large dataset of URLs labeled as 'good' (safe) or 'bad' (phishing/malicious). The dataset is balanced to ensure equal representation of both classes.

2. **Text Normalization**: Each URL is tokenized (split into words and special characters), stemmed (reduced to root forms), and then joined into a single string for further processing.

3. **Feature Extraction (TF-IDF Vectorization)**: URLs are converted into numerical features using TF-IDF (Term Frequency-Inverse Document Frequency) vectorization. This technique highlights important words/tokens in each URL, allowing the model to focus on patterns that distinguish safe from malicious links.

4. **Model Training (Logistic Regression)**: A Logistic Regression classifier is trained on the vectorized URLs. This model learns to predict whether a given URL is likely to be safe or phishing based on the patterns in the training data.

5. **Evaluation**: The model is evaluated using accuracy, precision, recall, F1-score, and confusion matrix to ensure reliable performance. The model achieves high accuracy in distinguishing between good and bad links.

6. **Usage**: When a user enters a URL, it is preprocessed and vectorized in the same way as the training data, then passed to the trained model. The model outputs whether the link is likely safe or phishing.

The model and vectorizer are saved and loaded for fast, repeated predictions without retraining.

## Usage

Visit the [webpage](https://darkshadow-exe.github.io/Linky/) to use a simpified demo, whose frontend is hosted on GitHub Pages and the model on [Hugging Face](https://huggingface.co/spaces/darkShadow-exe/LinkyAPI)

## Further Plans

1. Package the app into a web extension
2. Clean up the demo
