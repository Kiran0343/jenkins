from flask import Flask, render_template, request, jsonify
import pandas as pd

# Sample DataFrame
data = {
    "client_id": [1, 1, 2, 2, 3, 3],
    "segment_name": ["A", "B", "A", "C", "B", "C"]
}
df = pd.DataFrame(data)

app = Flask(__name__)

@app.route('/')
def index():
    # Get unique client IDs for the first dropdown
    unique_client_ids = df['client_id'].unique()
    return render_template('index.html', clients=unique_client_ids)

@app.route('/get_segments', methods=['POST'])
def get_segments():
    client_id = request.form['client_id']
    # Filter DataFrame for the selected client ID and get unique segment names
    filtered_segments = df[df['client_id'] == int(client_id)]['segment_name'].unique()
    return jsonify(list(filtered_segments))

if __name__ == '__main__':
    app.run(debug=True)
