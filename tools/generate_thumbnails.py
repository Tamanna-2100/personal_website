import fitz
from PIL import Image
import os

CERT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'certificates')
CERT_DIR = os.path.abspath(CERT_DIR)

OUT_PREFIX = 'thumb-'
OUT_WIDTH = 1200

os.makedirs(CERT_DIR, exist_ok=True)

pdf_files = [f for f in os.listdir(CERT_DIR) if f.lower().endswith('.pdf')]
if not pdf_files:
    print('No PDF certificates found in', CERT_DIR)

for pdf in pdf_files:
    in_path = os.path.join(CERT_DIR, pdf)
    safe_name = pdf.replace(' ', '_')
    name_noext = os.path.splitext(safe_name)[0]
    out_name = OUT_PREFIX + name_noext + '.webp'
    out_path = os.path.join(CERT_DIR, out_name)

    try:
        doc = fitz.open(in_path)
        page = doc.load_page(0)
        mat = fitz.Matrix(2, 2)  # render at 2x for quality
        pix = page.get_pixmap(matrix=mat, alpha=False)
        img_data = pix.tobytes('png')

        # Use Pillow to convert and resize
        from io import BytesIO
        im = Image.open(BytesIO(img_data))
        # resize keeping aspect ratio to OUT_WIDTH
        w, h = im.size
        if w > OUT_WIDTH:
            new_h = int((OUT_WIDTH / w) * h)
            im = im.resize((OUT_WIDTH, new_h), Image.LANCZOS)
        im.save(out_path, 'WEBP', quality=80)
        print(f'Wrote thumbnail: {out_path}')
    except Exception as e:
        print('Failed to create thumbnail for', pdf, '->', e)
