import warnings
warnings.filterwarnings("ignore")

import numpy as np

from sklearn.metrics import silhouette_score
from sklearn.preprocessing import normalize
from sklearn.cluster import KMeans
from collections import Counter

def run_clustering(data):
    data = normalize(data)
    
    print("Data normalized (L2)")
    data = data + 1e-8  # avoid zero variance issues
    best_k = None
    best_score = -1
    
    for k in range(2, 4):  # try 2 to 4 clusters
        kmeans = KMeans(
            n_clusters=k,
            random_state=42,
            n_init=10,
            max_iter=300
        )
        labels = kmeans.fit_predict(data)
    
        score = silhouette_score(data, labels)
    
        print(f"k={k}, score={score}")
    
        if score > best_score:
            best_score = score
            best_k = k
    
    best_k = 3  # override for testing
    
    print("\nBest k:", best_k)
    print("Best score:", best_score)
    
    print(Counter(labels))
    
    if score < 0.25:
        print("❌ Poor clustering")
    elif score < 0.5:
        print("⚠️ Acceptable clustering")
    else:
        print("✅ Strong clustering")
    
    print("\nStability check:")
    
    for i in range(3):
        kmeans = KMeans(
            n_clusters=best_k,
            random_state=42,
            n_init=10,
            max_iter=300
        )
        labels = kmeans.fit_predict(data)
    
        score = silhouette_score(data, labels)
        print(f"Run {i}: score={score}")
    
    final_kmeans = KMeans(
        n_clusters=best_k,
        random_state=42,
        n_init=10,
        max_iter=300
    )
    final_labels = final_kmeans.fit_predict(data)
    
    # Save cluster assignments
    with open("../outputs/clusters.txt", "w") as f:
        for i, label in enumerate(final_labels):
            f.write(f"Sequence_{i}: Cluster_{label}\n")
    
    print("Clusters saved to outputs/clusters.txt")
    
    return final_kmeans, final_labels

if __name__ == "__main__":
    from feature_extract import get_dataset
    from scoring import compute_scores
    from sklearn.preprocessing import normalize
    
    data = get_dataset()
    data = normalize(data)
    model, labels = run_clustering(data)
    
    own_distances, novelty_scores, confidence_scores, categories = compute_scores(data, model, labels)
    
    high_novel_threshold = 0.98
    high_novel = [i for i, score in enumerate(novelty_scores) if score > high_novel_threshold]
    
    print("\nHigh-confidence novel sequences:", len(high_novel))
    
    # ------------------------------
    # SAVE RESULTS
    # ------------------------------
    
    with open("../outputs/phase5_results.txt", "w") as f:
        for i in range(len(data)):
            f.write(
                f"Sequence_{i}, "
                f"Cluster_{labels[i]}, "
                f"Distance_{own_distances[i]:.4f}, "
                f"Novelty_{novelty_scores[i]:.4f}, "
                f"Confidence_{confidence_scores[i]:.4f}, "
                f"{categories[i]}\n"
            )
            
    print("Phase 5 results saved to outputs/phase5_results.txt")