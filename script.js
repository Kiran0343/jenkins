from docx import Document
from docx.shared import Pt, Inches
from docx.enum.style import WD_STYLE_TYPE
from docx.enum.table import WD_TABLE_ALIGNMENT

def create_client_feedback_document():
    document = Document()
    
    # Define styles (as before)
    # ...

    # Function to create a box (table with borders)
    def add_box(content, style='Normal Text'):
        table = document.add_table(rows=1, cols=1)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        cell = table.cell(0, 0)
        cell.width = Inches(6)
        for paragraph in content:
            p = cell.add_paragraph(paragraph, style=style)
        # Add borders to the table
        for row in table.rows:
            for cell in row.cells:
                cell.width = Inches(6)
                for paragraph in cell.paragraphs:
                    for run in paragraph.runs:
                        run.font.size = Pt(11)
        for cell in table.rows[0].cells:
            cell.width = Inches(6)
        document.add_paragraph()  # Add some space after the box

    # Title box
    add_box(['Leveraging LLM models to summarize CLIENT 46 client feedback as captured in CX360'], 'Title')

    # LLM prompt parameters box
    add_box([
        'LLM prompt parameters:',
        'Source : CX360 dataset (do we need more explanation about the source data)',
        'Data time window – 15 months',
        'PXO Client Id : 46(CLIENT 46)',
        'Field used : ONLY comments field',
        'LLM model : gpt-4-32k'
    ], 'Normal Text')

    # CLIENT REPORTING TOOL box
    add_box([
        'CLIENT REPORTING TOOL',
        'Client Id : 46    Service Selected : RED & AMBER SERVICES',
        'Question : TOP 5 POSITIVE POINTS    Overall Rating : AMBER',
        'DO NOT HAVE ENOUGH INFORMATION TO ANSWER THE QUESTION'
    ], 'Normal Text')

    # Save the document
    document.save('client_feedback_summary.docx')

if __name__ == "__main__":
    create_client_feedback_document()
    print("Word document 'client_feedback_summary.docx' created successfully with proper styling and boxes.")
