<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CLIENT REPORTING TOOL</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='results_style.css') }}">
</head>
<body style="background-color:#16580F">
    <h1 style="color:#ffffff;">CLIENT REPORTING TOOL</h1>
    <div class="form-container" style="position: relative;">
        <button onclick="downloadDoc()" style="position: absolute; top: 10px; right: 10px;">Download as .doc</button>
        <form class="form-container">
            {% if segment_name == 'all services' or segment_name == 'RED & AMBER SERVICES' %}
            <h3 align="center">Client Id: {{client_id}}&nbsp;&nbsp;&nbsp;Service Selected: {{ segment_name.upper() }}</h3>
            <h3 align="center">Question: {{question.upper()}}&nbsp;&nbsp;&nbsp;Overall Rating: {{ final_overall_rating.upper() }}</h3>
            <h4 align="center">Client Id: {{client.id}}&nbsp;&nbsp;&nbsp;Question: {{question.upper()}}</h4>
            <h4 align="center">Overall Rating: {{ final_overall_rating.upper() }}&nbsp;&nbsp;&nbsp;Service Rating: {{ service_rating.upper() }}</h4>
            {% endif %}
            <textarea id="results" name="results" readonly>{{html_formatted_text.strip()}}</textarea>
        </form>
    </div>
    <script>
        function downloadDoc() {
            const results = document.getElementById('results').value;
            const blob = new Blob([results], { type: 'application/msword' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'report.doc';
            a.click();
            window.URL.revokeObjectURL(url);
        }
    </script>
</body>
</html>
