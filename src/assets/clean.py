import re
import sys

def replace_brackets(file_path, clean = False):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    counter = 1

    def replace_callback(match):
        nonlocal counter
        result = f'[{counter}]'
        counter += 1
        return result

    new_lines = []
    for line in lines:
        new_line = re.sub(r'\[(.*?)\]', replace_callback, line)
        new_lines.append(new_line)

    new_file = file_path
    if clean:
        # Remove the first line
        lines = lines[1:]
        # Remove the last line
        new_lines = new_lines[:-1]
        new_file = file_path[:-3] + "_clean.md"

    with open(new_file, 'w') as file:
        file.writelines(new_lines)

    print(f"File '{file_path}' has been updated with increasing numbers inside square brackets, and the first and last lines have been removed.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script.py <file_path>")
        sys.exit(1)

    file_path = sys.argv[1]
    if len(sys.argv) > 2:
        replace_brackets(file_path, True)
    else:
        replace_brackets(file_path)
