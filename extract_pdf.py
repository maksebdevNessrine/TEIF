import pdfplumber
import json
import re

pdf_path = r"c:\Users\Makseb-DEV-05\Downloads\TEIF-main\elfatooraSpecTech\Guide-Implementation-TEIF_V2.0.pdf"

try:
    with pdfplumber.open(pdf_path) as pdf:
        print(f"Total pages: {len(pdf.pages)}")
        print("\n" + "="*80)
        print("PDF CONTENT EXTRACTION")
        print("="*80)
        
        full_text = ""
        
        # Extract text from all pages
        for page_num, page in enumerate(pdf.pages, 1):
            text = page.extract_text()
            if text:
                full_text += f"\n\n--- PAGE {page_num} ---\n{text}"
        
        # Save full text to a file for analysis
        with open(r"c:\Users\Makseb-DEV-05\Downloads\TEIF-main\pdf_extracted.txt", "w", encoding="utf-8") as f:
            f.write(full_text)
        
        print(full_text)
        
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
