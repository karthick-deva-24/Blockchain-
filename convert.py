import sys
from PIL import Image
import os

input_path = r"C:\Users\deval\.gemini\antigravity\brain\60ea7926-bd24-415f-99b2-8f2ccd79c76d\cryption_logo_1785427237704.jpg"
output_dir = r"c:\Users\deval\Desktop\Blockchain\images"
output_path = os.path.join(output_dir, "logo.webp")

os.makedirs(output_dir, exist_ok=True)

try:
    img = Image.open(input_path)
    # Save as webp with high quality, aiming for around 100kb depending on size
    img.save(output_path, "WEBP", quality=85)
    print(f"Successfully saved to {output_path}")
    size = os.path.getsize(output_path)
    print(f"Size: {size / 1024:.2f} KB")
except Exception as e:
    print(f"Error: {e}")
