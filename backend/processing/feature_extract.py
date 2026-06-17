import itertools
from preprocess import load_sequences, generate_kmers
clean_sequences = load_sequences("../data/synthetic.fasta")

bases = ["A", "T", "G", "C"]
k = 4

all_kmers = ["".join(p) for p in itertools.product(bases, repeat=k)]

def sequence_to_vector(sequence, k_val=None):
    if k_val is None:
        k_val = k
    kmers = generate_kmers(sequence, k_val)
    
    vector = [0] * len(all_kmers)
    
    for kmer in kmers:
        if kmer in all_kmers:
            idx = all_kmers.index(kmer)
            vector[idx] += 1
    
    return vector

vec = sequence_to_vector(clean_sequences[0])
print(len(vec))   # should be 64

dataset = []

for seq in clean_sequences:
    dataset.append(sequence_to_vector(seq))

print("Total vectors:", len(dataset))
print("Vector size:", len(dataset[0]))

def get_dataset():
    return dataset

