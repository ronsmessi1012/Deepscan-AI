import numpy as np
from sklearn.metrics import pairwise_distances


def compute_scores(X, model, labels):

    # Distance from each point to all cluster centers
    distances = pairwise_distances(X, model.cluster_centers_)

    # Distance to own cluster
    own_distances = np.array([
        distances[i][labels[i]] for i in range(len(X))
    ])

    # ------------------------------
    # Novelty Score (normalized)
    # ------------------------------
    min_d = np.min(own_distances)
    max_d = np.max(own_distances)

    novelty_scores = (own_distances - min_d) / (max_d - min_d + 1e-8)

    # ------------------------------
    # Confidence Score
    # ------------------------------
    confidence_scores = 1 / (1 + own_distances)

    # ------------------------------
    # Categorization
    # ------------------------------
    mean = np.mean(own_distances)
    std = np.std(own_distances)

    threshold = mean + std

    categories = []

    for d in own_distances:
        if d < mean:
            categories.append("Known-like")
        elif d < threshold:
            categories.append("Similar")
        else:
            categories.append("Potentially novel")

    return own_distances, novelty_scores, confidence_scores, categories