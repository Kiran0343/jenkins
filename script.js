function downloadDoc() {
    const clientId = "{{ client.id }}";
    const segmentName = "{{ segment_name.upper() }}";
    const overallRating = "{{ final_overall_rating.upper() }}";
    const serviceRating = "{{ service_rating.upper() }}";
    const question = "{{ question.upper() }}";
    const results = document.getElementById('results').value;

    // Format the content for the .doc file
    let docContent = `
CLIENT REPORTING TOOL

Client Id: ${clientId}
Service Selected: ${segmentName}
Question: ${question}
Overall Rating: ${overallRating}
Service Rating: ${serviceRating}

${results.split("\n").map((line, index) => `${index + 1}. ${line}`).join("\n\n")}
    `;

    // Create a Blob from the content
    const blob = new Blob([docContent.trim()], { type: 'application/msword' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.doc';
    a.click();
    window.URL.revokeObjectURL(url);
}
