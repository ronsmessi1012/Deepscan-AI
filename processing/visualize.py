import matplotlib.pyplot as plt

def plot_clusters(X, labels):

    plt.scatter(X[:, 0], X[:, 1], c=labels)
    plt.title("Cluster Visualization")
    plt.savefig("../outputs/clusters.png")
    plt.show()
def plot_novelty(novelty):

    plt.hist(novelty, bins=20)
    plt.title("Novelty Distribution")
    plt.savefig("../outputs/novelty.png")
    plt.show()    