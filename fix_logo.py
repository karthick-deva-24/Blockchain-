import os
import glob
from PIL import Image
import shutil

# Check if there is an assets folder
logo_path = 'images/logo.webp'
if os.path.exists('assets'):
    # Look for a logo inside assets
    for ext in ['webp', 'png', 'jpg', 'jpeg', 'svg']:
        possible_path = f'assets/logo.{ext}'
        if os.path.exists(possible_path):
            logo_path = possible_path
            break
        # Also check for any file
    files = os.listdir('assets')
    for file in files:
        if 'logo' in file.lower() or 'stackly' in file.lower():
            logo_path = os.path.join('assets', file)
            break

# Ensure it's webp
if not logo_path.endswith('.webp'):
    img = Image.open(logo_path)
    new_path = logo_path.rsplit('.', 1)[0] + '.webp'
    img.save(new_path, "WEBP", quality=90)
    logo_path = new_path

# Copy to images folder if it's not there
if not logo_path.startswith('images/'):
    shutil.copy(logo_path, 'images/logo.webp')
    logo_path = 'images/logo.webp'

def compress_image(path, target_size=100*1024):
    if not os.path.exists(path):
        return
    size = os.path.getsize(path)
    if size > target_size:
        img = Image.open(path)
        quality = 80
        while size > target_size and quality > 10:
            img.save(path, "WEBP", quality=quality)
            size = os.path.getsize(path)
            quality -= 5

compress_image(logo_path)

html_files = glob.glob('*.html')
old_str = '<h2 class="site-logo" style="margin: 0; font-size: 1.8rem; color: #14b8a6; letter-spacing: 2px;">Stackly</h2>'
new_str = '<img src="images/logo.webp" alt="Brand Logo" class="site-logo" style="height: 50px; width: auto; max-width: 200px;">'

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_str in content:
        content = content.replace(old_str, new_str)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file}')
