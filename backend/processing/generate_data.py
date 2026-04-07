import random

# DNA letters
bases = ["A", "T", "G", "C"]

# Function: generate random DNA
def random_sequence(length=50):
    return "".join(random.choice(bases) for _ in range(length))

# Function: mutate a sequence
def mutate_sequence(seq, mutation_rate=0.05):
    seq = list(seq)
    for i in range(len(seq)):
        if random.random() < mutation_rate:
            seq[i] = random.choice(bases)
    return "".join(seq)

# Function: insert random noise (optional realism)
def insert_noise(seq, noise_rate=0.02):
    seq = list(seq)
    new_seq = []
    for base in seq:
        new_seq.append(base)
        if random.random() < noise_rate:
            new_seq.append(random.choice(bases))  # insertion
    return "".join(new_seq)

# Base biological pattern
base_pattern = "ATGCGTATGCGTATGCGT"

# Create file
with open("../data/synthetic.fasta", "w") as f:

    # 🟢 Known sequences (slight natural variation)
    for i in range(200):
        seq = base_pattern * 2
        seq = mutate_sequence(seq, mutation_rate=0.01)  # very small variation
        f.write(f">known_{i}\n{seq}\n")

    # 🟡 Similar sequences (more variation)
    for i in range(200):
        seq = base_pattern * 2
        seq = mutate_sequence(seq, mutation_rate=0.10)  # moderate mutation
        seq = insert_noise(seq, noise_rate=0.02)        # slight insertions
        f.write(f">similar_{i}\n{seq}\n")

    # 🔴 Unknown sequences (fully random)
    for i in range(200):
        seq = random_sequence(40)
        f.write(f">unknown_{i}\n{seq}\n")

print("Improved dataset created!")
