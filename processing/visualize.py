import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE

# Optional (install if needed: pip install umap-learn)
try:
    from umap import UMAP
    UMAP_AVAILABLE = True
except:
    UMAP_AVAILABLE = False


# 🔹 PCA (fast, baseline)
def plot_clusters_pca(X, labels):
    pca = PCA(n_components=2)
    X_reduced = pca.fit_transform(X)

    plt.figure()
    plt.scatter(X_reduced[:, 0], X_reduced[:, 1], c=labels)
    plt.title("Cluster Visualization (PCA)")
    plt.savefig("../outputs/clusters_pca.png")
    plt.show()


# 🔹 t-SNE (better separation, slower)
def plot_clusters_tsne(X, labels):
    tsne = TSNE(n_components=2, perplexity=30, random_state=42)
    X_reduced = tsne.fit_transform(X)

    plt.figure()
    plt.scatter(X_reduced[:, 0], X_reduced[:, 1], c=labels)
    plt.title("Cluster Visualization (t-SNE)")
    plt.savefig("../outputs/clusters_tsne.png")
    plt.show()


# 🔹 UMAP (best for biological data)
def plot_clusters_umap(X, labels):
    if not UMAP_AVAILABLE:
        print("UMAP not installed. Run: pip install umap-learn")
        return

    umap = UMAP(n_components=2, random_state=42)
    X_reduced = umap.fit_transform(X)

    plt.figure()
    plt.scatter(X_reduced[:, 0], X_reduced[:, 1], c=labels)
    plt.title("Cluster Visualization (UMAP)")
    plt.savefig("../outputs/clusters_umap.png")
    plt.show()


# 🔹 Novelty distribution (keep as is, just cleaner)
def plot_novelty(novelty):
    plt.figure()
    plt.hist(novelty, bins=20)
    plt.title("Novelty Distribution")
    plt.savefig("../outputs/novelty.png")
    plt.show()