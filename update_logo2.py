import glob

html_files = glob.glob('*.html')
old_str = '<img src="images/logo.webp" alt="Brand Logo" class="site-logo" style="height: 50px; width: auto; max-width: 200px;">'
new_str = '<img src="images/logo_0024.webp" alt="Brand Logo" class="site-logo" style="height: 50px; width: auto; max-width: 200px;">'

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_str in content:
        content = content.replace(old_str, new_str)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file}')
