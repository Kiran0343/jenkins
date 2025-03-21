from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

def create_client_feedback_document():
    document = Document()
    
    # Function to create a bordered box with proper text alignment
    def add_bordered_box(title_text, content_lines):
        # Create table with single cell to act as a box
        table = document.add_table(rows=1, cols=1)
        table.style = 'Table Grid'  # This adds borders
        
        cell = table.cell(0, 0)
        
        # If there's a title, add it with proper formatting
        if title_text:
            title_para = cell.paragraphs[0]  # Use existing paragraph
            title_para.text = title_text
            title_para.style = document.styles['Normal']
            title_para.alignment = WD_ALIGN_PARAGRAPH.LEFT
            title_run = title_para.runs[0]
            title_run.font.bold = True
            
            # Add empty paragraph to separate title from content
            cell.add_paragraph()
        else:
            # If no title, use first paragraph for first content line
            first_para = cell.paragraphs[0]
        
        # Add each line of content with proper alignment
        for i, line in enumerate(content_lines):
            if title_text == '' and i == 0:
                # If no title and first content line, use the existing paragraph
                para = first_para
            else:
                para = cell.add_paragraph()
            
            para.text = line
            para.style = document.styles['Normal']
            para.alignment = WD_ALIGN_PARAGRAPH.LEFT
        
        # Add space after box
        document.add_paragraph()
    
    # Title box - no title, just content
    title_content = ['Leveraging LLM models to summarize CLIENT 46 client feedback as captured in CX360']
    add_bordered_box('', title_content)
    
    # LLM parameters box
    llm_content = [
        'Source : CX360 dataset (do we need more explanation about the source data)',
        'Data time window – 15 months',
        'PXO Client Id : 46(CLIENT 46)',
        'Field used : ONLY comments field',
        'LLM model : gpt-4-32k'
    ]
    add_bordered_box('LLM prompt parameters:', llm_content)
    
    # Client reporting tool box
    client_content = [
        'Client Id : 46    Service Selected : RED & AMBER SERVICES',
        'Question : TOP 5 POSITIVE POINTS    Overall Rating : AMBER',
        'DO NOT HAVE ENOUGH INFORMATION TO ANSWER THE QUESTION'
    ]
    add_bordered_box('CLIENT REPORTING TOOL', client_content)
    
    # Save the document
    document.save('client_feedback_summary.docx')

if __name__ == "__main__":
    create_client_feedback_document()
    print("Word document created successfully with proper formatting.")
