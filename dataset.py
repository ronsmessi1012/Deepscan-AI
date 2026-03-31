import random

def generate_dna(length=50):
    return ''.join(random.choice(['A','T','G','C']) for _ in range(length))

# create dataset
sequences = [generate_dna(50) for _ in range(100)]

# preview
for seq in sequences[:5]:
    print(seq)

with open("edna.fasta", "w") as f:
    for i, seq in enumerate(sequences):
        f.write(f">seq_{i}\n{seq}\n")