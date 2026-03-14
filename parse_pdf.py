import fitz
import sys

doc = fitz.open('public/KARTIK MULTI SOLUTIONS- website structure.pdf')
text = ""
for page in doc:
    text += page.get_text()

with open('parsed-doc.txt', 'w', encoding='utf-8') as f:
    f.write(text)
