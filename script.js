from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn

def create_client_feedback_document():
    document = Document()
    
    # Function to create a boxed section with border
    def add_boxed_section(title, content):
        # Create table with single cell to act as a box
        table = document.add_table(rows=1, cols=1)
        
        # Add borders to the table
        table_element = table._element
        tblPr = table_element.xpath('./w:tblPr')[0]
        
        # Ensure we have borders
        tblBorders = tblPr.xpath('./w:tblBorders')
        if not tblBorders:
            tblBorders = OxmlElement('w:tblBorders')
            tblPr.append(tblBorders)
        else:
            tblBorders = tblBorders[0]
            
        # Set all borders
        for border_type in ['top', 'left', 'bottom', 'right']:
            border = OxmlElement(f'w:{border_type}')
            border.set(qn('w:val'), 'single')
            border.set(qn('w:sz'), '4')  # 1/4 pt
            border.set(qn('w:space'), '0')
            border.set(qn('w:color'), 'auto')
            tblBorders.append(border)
            
        cell = table.cell(0, 0)
        
        # Add title if provided
        if title:
            title_para = cell.paragraphs[0]
            title_para.text = title
            title_para.style = document.styles['Normal']
            title_run = title_para.runs[0]
            title_run.font.size = Pt(14)
            title_run.font.bold = True
            
            # Add line break
            cell.add_paragraph()
        
        # Add content
        for line in content:
            para = cell.add_paragraph()
            para.text = line
            para.style = document.styles['Normal']
            
        # Add space after box
        document.add_paragraph()

    # Create title section
    title_content = ['Leveraging LLM models to summarize CLIENT 46 client feedback as captured in CX360']
    add_boxed_section('', title_content)
    
    # Create LLM parameters section
    llm_content = [
        'Source : CX360 dataset (do we need more explanation about the source data)',
        'Data time window – 15 months',
        'PXO Client Id : 46(CLIENT 46)',
        'Field used : ONLY comments field',
        'LLM model : gpt-4-32k'
    ]
    add_boxed_section('LLM prompt parameters:', llm_content)
    
    # Create client reporting tool section
    client_content = [
        'Client Id : 46    Service Selected : RED & AMBER SERVICES',
        'Question : TOP 5 POSITIVE POINTS    Overall Rating : AMBER',
        'DO NOT HAVE ENOUGH INFORMATION TO ANSWER THE QUESTION'
    ]
    add_boxed_section('CLIENT REPORTING TOOL', client_content)
    
    # Save the document
    document.save('client_feedback_summary.docx')

# Add missing OxmlElement function
from docx.oxml import OxmlElement

if __name__ == "__main__":
    create_client_feedback_document()
    print("Word document 'client_feedback_summary.docx' created successfully with proper styling.")
