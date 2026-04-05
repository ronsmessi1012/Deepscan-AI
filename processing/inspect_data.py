file_path = "../data/synthetic.fasta"

sequence_count = 0
total_length = 0
short_sequences = 0

current_sequence = ""

with open(file_path, "r") as f:
    for line in f:
        line = line.strip()

        if line.startswith(">"):
            if current_sequence:
                sequence_count += 1
                total_length += len(current_sequence)

                if len(current_sequence) < 30:
                    short_sequences += 1

            current_sequence = ""
        else:
            current_sequence += line

# last sequence
if current_sequence:
    sequence_count += 1
    total_length += len(current_sequence)
    if len(current_sequence) < 30:
        short_sequences += 1

# results
avg_length = total_length / sequence_count

print("Total sequences:", sequence_count)
print("Average length:", avg_length)
print("Short sequences (<30):", short_sequences)