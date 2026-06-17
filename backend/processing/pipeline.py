import os
import sys
sys.path.append(os.path.abspath('..'))

from preprocess import load_sequences, vectorize_sequences
from clustering import run_clustering
from scoring import compute_scores
from function import predict_function

import joblib

MODEL_PATH = "../models/kingdom_model.pkl"

def get_kingdom_model():
    if os.path.exists(MODEL_PATH):
        print("Loading cached kingdom model...")
        return joblib.load(MODEL_PATH)
    else:
        print("Training kingdom model...")
        from models.classifier import load_kingdom_data, train_model
        
        files = {
            "Bacteria": "../data/bacteria.fasta",
            "Archaea": "../data/archaea.fasta",
            "Protista": "../data/protista.fasta",
            "Fungi": "../data/fungi.fasta",
            "Plantae": "../data/plantae.fasta",
            "Animalia": "../data/animalia.fasta"
        }
        X, y = load_kingdom_data(files)
        model = train_model(X, y)
        os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
        joblib.dump(model, MODEL_PATH)
        return model

def run_pipeline(file_path):

    # Step 1: Load
    sequences = load_sequences(file_path)

    # Step 2: Preprocess
    X, kmers_list = vectorize_sequences(sequences)

    from sklearn.preprocessing import normalize
    X = normalize(X)

    # Step 3: Clustering
    model, labels = run_clustering(X)

    # Step 4: Scoring
    distances, novelty, confidence, categories = compute_scores(X, model, labels)

    # Step 5: Functional prediction
    functions = predict_function(sequences, kmers_list)

    # Step 6: Kingdom classification
    kingdom_model = get_kingdom_model()
    from models.classifier import predict_kingdom
    kingdoms = [predict_kingdom(kingdom_model, seq) for seq in sequences]

    import numpy as np
    return {
        "sequences": sequences,
        "labels": labels,
        "novelty": novelty,
        "confidence": confidence,
        "categories": categories,
        "functions": functions,
        "kingdoms": kingdoms,
        "X": np.array(X)
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

if __name__ == "__main__":
    from output import save_results, generate_summary
    from visualize import plot_clusters_pca, plot_clusters_tsne, plot_clusters_umap, plot_novelty
    
    file_path = "../data/synthetic.fasta"
    print(f"\n--- Running Full Pipeline ---")
    result = run_pipeline(file_path)
    
    output_csv = "../outputs/pipeline_results.csv"
    save_results(result, output_csv)
    print(f"Results saved to {output_csv}")
    
    generate_summary(result)
    
    print("\nGenerating visualizations...")
    plot_clusters_pca(result["X"], result["labels"])
    plot_clusters_tsne(result["X"], result["labels"])
    plot_clusters_umap(result["X"], result["labels"])
    plot_novelty(result["novelty"])