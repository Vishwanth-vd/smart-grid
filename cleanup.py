import re
import os

def remove_python_comments(source):
    # Remove docstrings (trip double quotes)
    source = re.sub(r'""".*?"""', '', source, flags=re.DOTALL)
    # Remove docstrings (trip single quotes)
    source = re.sub(r"'''.*?'''", "", source, flags=re.DOTALL)
    # Remove single line comments
    source = re.sub(r'#.*', '', source)
    # Remove empty lines created by comment removal
    lines = [line for line in source.splitlines() if line.strip()]
    return '\n'.join(lines)

def remove_js_comments(source):
    # Remove multi-line comments
    source = re.sub(r'/\*[\s\S]*?\*/', '', source)
    # Remove single-line comments
    source = re.sub(r'//.*', '', source)
    # Remove empty lines
    lines = [line for line in source.splitlines() if line.strip()]
    return '\n'.join(lines)

def remove_html_comments(source):
    # Remove HTML comments
    source = re.sub(r'<!--[\s\S]*?-->', '', source)
    # Remove empty lines
    lines = [line for line in source.splitlines() if line.strip()]
    return '\n'.join(lines)

def clean_file(filepath, filetype):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if filetype == 'python':
            cleaned = remove_python_comments(content)
        elif filetype == 'js':
            cleaned = remove_js_comments(content)
        elif filetype == 'html':
            cleaned = remove_html_comments(content)
        else:
            return

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(cleaned)
        print(f"Cleaned {filepath}")
    except Exception as e:
        print(f"Error cleaning {filepath}: {e}")

# Files to clean
files = [
    ('backend/app.py', 'python'),
    ('backend/agent.py', 'python'),
    ('backend/users.py', 'python'),
    ('backend/firebase_config.py', 'python'),
    ('frontend/grid_v6.js', 'js'),
    ('frontend/index.html', 'html'),
    ('frontend/sw.js', 'js')
]

base_dir = os.getcwd()
for rel_path, ftype in files:
    clean_file(os.path.join(base_dir, rel_path), ftype)
