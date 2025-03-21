from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

# Create a new document
doc = Document()

# Add a green horizontal line at the top (without needing an image)
paragraph = doc.add_paragraph()
p = paragraph._p
pPr = p.get_or_add_pPr()
pBdr = OxmlElement('w:pBdr')
bottom = OxmlElement('w:bottom')
bottom.set(qn('w:val'), 'single')
bottom.set(qn('w:sz'), '24')  # 24 eighths of a point = 3 points
bottom.set(qn('w:space'), '0')
bottom.set(qn('w:color'), '00B050')  # Green color
pBdr.append(bottom)
pPr.append(pBdr)

# Add space after the line
doc.add_paragraph()

# Create the dark blue header box
header_paragraph = doc.add_paragraph()
header_paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
header_run = header_paragraph.add_run("CLIENT REPORTING TOOL")
header_run.font.size = Pt(16)
header_run.font.name = "Arial"
header_run.font.bold = True
header_run.font.color.rgb = RGBColor(255, 255, 255)  # White text

# Set paragraph background to dark blue
shading_elm = OxmlElement('w:shd')
shading_elm.set(qn('w:fill'), "2B3A4D")  # Dark blue color
header_paragraph._p.get_or_add_pPr().append(shading_elm)

# Add client information section
info_paragraph = doc.add_paragraph()
client_run = info_paragraph.add_run("Client Id : 46     Service Selected : RED & AMBER SERVICES")
client_run.font.bold = True
client_run.font.size = Pt(12)

# Add question and rating section
question_paragraph = doc.add_paragraph()
question_run = question_paragraph.add_run("Question : TOP 5 POSITIVE POINTS     Overall Rating : AMBER")
question_run.font.bold = True
question_run.font.size = Pt(12)

# Add the large box with the "not enough information" message
box_paragraph = doc.add_paragraph()
box_run = box_paragraph.add_run("DO NOT HAVE ENOUGH INFORMATION TO ANSWER THE QUESTION")
box_run.font.size = Pt(12)

# Add border to the box paragraph
p = box_paragraph._p
pPr = p.get_or_add_pPr()
pBdr = OxmlElement('w:pBdr')
for side in ['top', 'left', 'bottom', 'right']:
    border = OxmlElement(f'w:{side}')
    border.set(qn('w:val'), 'single')
    border.set(qn('w:sz'), '4')
    border.set(qn('w:space'), '0')
    border.set(qn('w:color'), 'auto')
    pBdr.append(border)
pPr.append(pBdr)

# Save the document
doc.save('client_report.docx')
