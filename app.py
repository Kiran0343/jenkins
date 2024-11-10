from flask import Flask, render_template, request, jsonify
import pandas as pd

app = Flask(__name__)

# Sample DataFrame (replace this with your actual data)
data = {
    'client_id': ['client1', 'client2', 'client3'],
    'segment_name': ['Segment A', 'Segment B', 'Segment C']
}
df = pd.DataFrame(data)

# Main route to render the form
@app.route('/')
def index():
    # Get unique client IDs for the dropdown
    client_ids = df['client_id'].unique()
    return render_template('index.html', client_ids=client_ids)

# Route to get segments based on selected client_id
@app.route('/get_segments', methods=['GET'])
def get_segments():
    client_id = request.args.get('client_id')
    # Filter the DataFrame for the selected client_id
    segments = df[df['client_id'] == client_id]['segment_name'].unique().tolist()
    return jsonify(segments=segments)


@app.route('/submit_request', methods=['GET','POST'])
def submit_request():
    if request.method == 'POST':
        print (request)
        client_id = request.form.get('client_id')
        segment_name = request.form.get('segment_name')
        question = request.form.get('questions')
        selected_line_number = request.form.get('selected_line')
        question = request.form.get('selected_text')
        manual_question = request.form.get('manual_question')
        print (manual_question)
        if not manual_question:
            return f"<h1 align center>CLIENT ID : {client_id}<br>SEGMENT : {segment_name}<br>QUESTION : {question}</h1>"
        if manual_question:
            return f"<h1 align center>CLIENT ID : {client_id}<br>SEGMENT : {segment_name}<br>QUESTION : {manual_question}</h1>"
    client_ids = df['client_id'].unique()
    return render_template('index.html', client_ids=client_ids)

if __name__ == "__main__":
    app.run(debug=True)
