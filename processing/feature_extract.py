import itertools
from preprocess import clean_sequences, generate_kmers

bases = ["A", "T", "G", "C"]
k = 4

all_kmers = ["".join(p) for p in itertools.product(bases, repeat=k)]

def sequence_to_vector(sequence, k=4):
    kmers = generate_kmers(sequence, k)
    
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

