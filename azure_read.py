from azure.storage.blob import BlobServiceClient
import pandas as pd
from io import StringIO

# Configuration
connection_string = "YOUR_AZURE_BLOB_STORAGE_CONNECTION_STRING"
container_name = "YOUR_CONTAINER_NAME"
blob_name = "YOUR_BLOB_NAME.csv"

# Create a BlobServiceClient
blob_service_client = BlobServiceClient.from_connection_string(connection_string)

# Get the BlobClient
blob_client = blob_service_client.get_blob_client(container=container_name, blob=blob_name)

# Download the blob content
blob_data = blob_client.download_blob()
csv_content = blob_data.content_as_text()

# Read the CSV content into a DataFrame
df = pd.read_csv(StringIO(csv_content))

# Display the DataFrame
display(df)