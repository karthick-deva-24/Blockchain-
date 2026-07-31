import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replacements
    content = content.replace('style="grid-template-columns: repeat(3, 1fr); gap: 2rem;"', 'class="grid grid-3" style="gap: 2rem;"')
    content = content.replace('style="grid-template-columns: repeat(3, 1fr);"', 'class="grid grid-3"')
    content = content.replace('style="grid-template-columns: 1fr 1fr; align-items: center;"', 'class="grid grid-2" style="align-items: center;"')
    content = content.replace('style="grid-template-columns: repeat(2, 1fr);"', 'class="grid grid-2"')
    content = content.replace('style="grid-template-columns: 2fr 1fr;"', 'class="grid grid-2-1"')
    content = content.replace('style="grid-template-columns: 1fr; gap: 1rem;"', 'class="grid grid-1" style="gap: 1rem;"')
    content = content.replace('style="grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;"', 'class="grid grid-2" style="gap: 1.5rem; margin-bottom: 1.5rem;"')
    
    # In index.html, fix stats font size overriding by adding class
    content = re.sub(r'<div>\s*<h2 style="font-size: 3rem;', r'<div class="stat-number-wrapper">\n                    <h2 style="font-size: 3rem;', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))
