from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

# Create a new document
doc = Document()

# Add a green horizontal line at the top
paragraph = doc.add_paragraph()
run = paragraph.add_run()
run.add_picture('green_line.jpg', width=Inches(6))  # You'll need to create this image

# Add some space
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

# Save the document
doc.save('client_report.docx')
