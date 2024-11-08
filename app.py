from flask import Flask, render_template, request, jsonify
import pandas as pd

app = Flask(__name__)

# Sample DataFrame
data = {
    'client_id': [1, 2, 3],
    'segment_name': ['A', 'B', 'C'],
    'segments': {
        1: ['Segment 1A', 'Segment 1B'],
        2: ['Segment 2A', 'Segment 2B'],
        3: ['Segment 3A', 'Segment 3B']
    }
}
df = pd.DataFrame(data)

@app.route('/')
def index():
    client_segments = df[['client_id']].drop_duplicates().to_dict(orient='records')
    return render_template('index.html', client_segments=client_segments)

@app.route('/get_segments/<int:client_id>')
def get_segments(client_id):
    segments = data['segments'].get(client_id, [])
    return jsonify(segments)

@app.route('/submit', methods=['POST'])
def submit():
    selected_client_id = request.form.get('client_id')
    selected_segment_name = request.form.get('segment_name')
    return f"Selected Client ID: {selected_client_id}, Segment Name: {selected_segment_name}"

if __name__ == '__main__':
    app.run(debug=True)