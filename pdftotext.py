import os
from PyPDF2 import PdfReader

def pdf_to_txt(pdf_path, txt_path):
    with open(pdf_path, 'rb') as pdf_file:
        pdf_reader = PdfReader(pdf_file)
        text = ''
        for page in pdf_reader.pages:
            text += page.extract_text()

    with open(txt_path, 'w', encoding='utf-8') as txt_file:
        txt_file.write(text)

def main():
    # Path to the public folder
    public_folder = 'public'

    # Get list of files in public folder
    files = os.listdir(public_folder)

    # Iterate through PDF files
    for file in files:
        if file.endswith('.pdf'):
            pdf_path = os.path.join(public_folder, file)
            txt_path = os.path.join(public_folder, file[:-4] + '.txt')
            pdf_to_txt(pdf_path, txt_path)
            print(f"Text extracted from {file} and saved to {file[:-4]}.txt")

if __name__ == "__main__":
    main()