from preprocess import load_sequences, vectorize_sequences
from clustering import run_clustering
from scoring import compute_scores
from function import predict_function

def run_pipeline(file_path):

    # Step 1: Load
    sequences = load_sequences(file_path)

    # Step 2: Preprocess
    X, kmers_list = vectorize_sequences(sequences)

    # Step 3: Clustering
    model, labels = run_clustering(X)

    # Step 4: Scoring
    distances, novelty, confidence, categories = compute_scores(X, model, labels)

    # Step 5: Functional prediction
    functions = predict_function(sequences, kmers_list)

    return {
        "sequences": sequences,
        "labels": labels,
        "novelty": novelty,
        "confidence": confidence,
        "categories": categories,
        "functions": functions
    }

import os

def run_batch(folder_path):
    results = []

    for file in os.listdir(folder_path):
        if file.endswith(".txt") or file.endswith(".fasta"):
            file_path = os.path.join(folder_path, file)
            print(f"Processing: {file}")

            result = run_pipeline(file_path)
            results.append((file, result))

    return results