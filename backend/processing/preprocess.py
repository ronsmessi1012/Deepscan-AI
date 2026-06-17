import itertools

# ------------------------------
# 1. Load + Clean Sequences
# ------------------------------
def load_sequences(file_path):

    clean_sequences = []
    current_sequence = ""

    with open(file_path, "r") as f:
        for line in f:
            line = line.strip()

            if line.startswith(">"):
                if current_sequence:
                    seq = current_sequence.upper()

                    if len(seq) >= 30:
                        clean_sequences.append(seq)

                current_sequence = ""
            else:
                current_sequence += line

    # last sequence
    if current_sequence:
        seq = current_sequence.upper()
        if len(seq) >= 30:
            clean_sequences.append(seq)

    print("Clean sequences:", len(clean_sequences))
    return clean_sequences


# ------------------------------
# 2. Generate k-mers
# ------------------------------
def generate_kmers(sequence, k=4):
    return [sequence[i:i+k] for i in range(len(sequence) - k + 1)]


# ------------------------------
# 3. Build k-mer vocabulary
# ------------------------------
bases = ["A", "T", "G", "C"]
k = 4
all_kmers = ["".join(p) for p in itertools.product(bases, repeat=k)]


# ------------------------------
# 4. Convert sequence → vector
# ------------------------------
kmer_to_idx = {kmer: i for i, kmer in enumerate(all_kmers)}

def sequence_to_vector(sequence, k=4):

    kmers = generate_kmers(sequence, k)
    vector = [0] * len(all_kmers)

    for kmer in kmers:
        if kmer in kmer_to_idx:
            vector[kmer_to_idx[kmer]] += 1

    return vector, kmers


# ------------------------------
# 5. Vectorize entire dataset
# ------------------------------
def vectorize_sequences(sequences):

    dataset = []
    kmers_list = []

    for seq in sequences:
        vec, kmers = sequence_to_vector(seq)
        dataset.append(vec)
        kmers_list.append(kmers)

    print("Total vectors:", len(dataset))
    print("Vector size:", len(dataset[0]))

    return dataset, kmers_list

