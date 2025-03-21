from docx import Document

# Open source document
source_doc = Document("source.docx")

# Create new document
dest_doc = Document()

# Copy each paragraph with formatting
for para in source_doc.paragraphs:
    # Create new paragraph
    new_para = dest_doc.add_paragraph()
    
    # Copy runs with their formatting
    for run in para.runs:
        new_run = new_para.add_run(run.text)
        new_run.bold = run.bold
        new_run.italic = run.italic
        new_run.underline = run.underline
        # Copy other formatting attributes as needed

# Save the new document
dest_doc.save("destination.docx")
