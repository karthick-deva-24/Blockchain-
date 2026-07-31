import os
import re

files_to_update = ['about.html', 'blog.html', 'contact.html', 'services.html', '404.html']

# read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# extract footer block
footer_match = re.search(r'<!-- Footer -->\s*<footer class="footer">.*?</footer>', content, flags=re.DOTALL)
if not footer_match:
    print("Footer not found in index.html")
    exit(1)

footer_html = footer_match.group(0)

# replace in other files
for file in files_to_update:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            file_content = f.read()
        
        # find the footer block in this file
        file_footer_match = re.search(r'<!-- Footer -->\s*<footer class="footer">.*?</footer>', file_content, flags=re.DOTALL)
        if file_footer_match:
            new_content = file_content[:file_footer_match.start()] + footer_html + file_content[file_footer_match.end():]
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated footer in {file}")
        else:
            print(f"Footer block not found in {file}")
