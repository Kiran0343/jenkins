from flask import Flask, request, render_template, jsonify
from azure.storage.blob import BlobServiceClient
import os

app = Flask(__name__)

# Load Azure Storage connection string from environment variable
AZURE_CONNECTION_STRING = os.getenv('AZURE_CONNECTION_STRING')

@app.route('/')
def upload_form():
    blob_service_client = BlobServiceClient.from_connection_string(AZURE_CONNECTION_STRING)
    container_client = blob_service_client.get_container_client('your-container-name')

    # Fetch a list of folders
    folders = set()
    for blob in container_client.list_blobs():
        folder_name = blob.name.split('/')[0]  # Get the top-level folder
        folders.add(folder_name)

    return render_template('upload.html', folders=list(folders))

@app.route('/subfolders/<folder>', methods=['GET'])
def get_subfolders(folder):
    blob_service_client = BlobServiceClient.from_connection_string(AZURE_CONNECTION_STRING)
    container_client = blob_service_client.get_container_client('your-container-name')

    subfolders = set()
    for blob in container_client.list_blobs(name_starts_with=f"{folder}/"):
        subfolder_parts = blob.name.split('/')
        if len(subfolder_parts) > 1:  # Ensure there's a subfolder
            subfolder_name = subfolder_parts[1]  # Get the first subfolder level
            subfolders.add(subfolder_name)

    return jsonify(list(subfolders))

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'
    
    file = request.files['file']
    folders = request.form.getlist('folder')

    # Construct the full path in Azure Blob Storage
    azure_path = '/'.join(filter(None, folders))  # Join non-empty folder names

    if file.filename == '':
        return 'No selected file'

    # Initialize the BlobServiceClient
    blob_service_client = BlobServiceClient.from_connection_string(AZURE_CONNECTION_STRING)
    
    # Create a blob client using the file name as the name for the blob
    blob_client = blob_service_client.get_blob_client(container='your-container-name', blob=f"{azure_path}/{file.filename}")

    # Upload the file
    blob_client.upload_blob(file, overwrite=True)

    return 'File uploaded successfully!'

if __name__ == '__main__':
    app.run(debug=True)