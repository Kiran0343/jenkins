from docx import Document

def update_word_document(file_path, replacements):
    # Load the Word document
    doc = Document(file_path)

    # Iterate through each paragraph in the document
    for paragraph in doc.paragraphs:
        for old_value, new_value in replacements.items():
            if old_value in paragraph.text:
                # Replace the old value with the new value
                paragraph.text = paragraph.text.replace(old_value, new_value)

    # Save the updated document
    updated_file_path = file_path.replace('.docx', '_updated.docx')
    doc.save(updated_file_path)
    print(f"Document updated and saved as: {updated_file_path}")

# Example usage
file_path = 'example.docx'  # Path to your Word document
replacements = {
    'old_value1': 'new_value1',
    'old_value2': 'new_value2'
}

update_word_document(file_path, replacements)
