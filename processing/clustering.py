import warnings
warnings.filterwarnings("ignore")

import numpy as np

from sklearn.metrics import silhouette_score
from feature_extract import get_dataset
from sklearn.preprocessing import normalize
from sklearn.cluster import KMeans

data = get_dataset()
data = normalize(data)

print("Data normalized (L2)")
data = data + 1e-8  # avoid zero variance issues
best_k = None
best_score = -1

for k in range(2, 4):  # try 2 to 8 clusters
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

from collections import Counter
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

# Phase 5

# ==============================
# PHASE 5 — INTERPRETATION & SCORING
# ==============================

from sklearn.metrics import pairwise_distances

X = data  # your feature matrix

# Distance from each point to all cluster centers
distances = pairwise_distances(X, final_kmeans.cluster_centers_)

# Distance to its OWN cluster center
own_distances = np.array([
    distances[i][final_labels[i]] for i in range(len(X))
])

print("Sample distances:", own_distances[:10])

# ------------------------------
# 5.1 Novelty Detection
# ------------------------------

mean = np.mean(own_distances)
std = np.std(own_distances)

threshold = mean + std

# ------------------------------
# 5.2 Confidence Scoring
# ------------------------------

confidence_scores = 1 / (1 + own_distances)
min_d = np.min(own_distances)
max_d = np.max(own_distances)

novelty_scores = (own_distances - min_d) / (max_d - min_d)

# ------------------------------
# 5.3 Categorization
# ------------------------------

categories = []

for d in own_distances:
    if d < mean:
        categories.append("Known-like")
    elif d < threshold:
        categories.append("Similar")
    else:
        categories.append("Potentially novel")

print("\nTop TRUE novel sequences (by normalized score):")

top_idx = np.argsort(novelty_scores)[-10:]

for i in top_idx:
    print(f"Sequence_{i}, Novelty={novelty_scores[i]:.4f}")

# ------------------------------
# 5.4 Biodiversity Estimation
# ------------------------------

cluster_counts = Counter(final_labels)

print("\nCluster distribution:", cluster_counts)
print("Estimated biodiversity (clusters):", len(cluster_counts))

# ------------------------------
# SAVE RESULTS
# ------------------------------

with open("../outputs/phase5_results.txt", "w") as f:
    for i in range(len(X)):
        f.write(
    f"Sequence_{i}, "
    f"Cluster_{final_labels[i]}, "
    f"Distance_{own_distances[i]:.4f}, "
    f"Novelty_{novelty_scores[i]:.4f}, "
    f"Confidence_{confidence_scores[i]:.4f}, "
    f"{categories[i]}\n"
)

print("Phase 5 results saved to outputs/phase5_results.txt")

high_novel_threshold = 0.98
high_novel = [i for i, score in enumerate(novelty_scores) if score > high_novel_threshold]

print("\nHigh-confidence novel sequences:", len(high_novel))
with open("../outputs/top_novel.txt", "w") as f:
    for i in top_idx:
        f.write(f"Sequence_{i}, Novelty={novelty_scores[i]:.4f}\n")
for c in set(final_labels):
    cluster_dist = own_distances[final_labels == c]
    print(f"\nCluster {c}:")
    print(f"  Mean distance: {np.mean(cluster_dist):.4f}")
    print(f"  Max distance: {np.max(cluster_dist):.4f}")