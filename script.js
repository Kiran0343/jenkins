function downloadDoc() {
    const clientId = "{{ client.id }}"; // Use your templating engine to get these values
    const segmentName = "{{ segment_name.upper() }}";
    const overallRating = "{{ final_overall_rating.upper() }}";
    const serviceRating = "{{ service_rating.upper() }}";
    const question = "{{ question.upper() }}";
    const results = document.getElementById('results').value;

    // Create the content for the .doc file
    let docContent = `
        CLIENT REPORTING TOOL

        Client Id: ${clientId}
        Service Selected: ${segmentName}
        Question: ${question}
        Overall Rating: ${overallRating}
        Service Rating: ${serviceRating}

        ${results.replace(/\n/g, "\n\n")}
    `;

    // Create a Blob from the content
    const blob = new Blob([docContent], { type: 'application/msword' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.doc';
    a.click();
    window.URL.revokeObjectURL(url);
}
