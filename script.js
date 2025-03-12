<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Data Entry Form</title>
    <style>
        .form-container {
            max-width: 700px;
            margin: 40px auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            /* Removed box-shadow for no backdrop effect */
            font-family: Times, serif;
        }

        h1 {
            font-size: 1.5rem;
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }

        .form-row {
            display: flex;
            align-items: center;
            margin-bottom: 10px; /* Reduced bottom margin */
            flex-wrap: wrap;
        }

        label {
            width: 100%;
            max-width: 35%;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
            font-size: 20px;
            font-family: Times, serif;
        }

        input, select, textarea {
            width: 100%;
            max-width: 65%;
            padding: 8px;
            font-size: 20px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
            font-family: Times, serif;
        }

        /* Align radio buttons with input fields */
        .radio-group {
            display: flex;
            align-items: center;
            max-width: 65%;
            margin-left: 35%; /* Align with input field */
        }

        .radio-group label {
            margin-right: 20px; /* Space between radio buttons */
            font-weight: normal; /* Normal font weight for radio labels */
            display: flex; /* Ensure label contents align in a row */
            align-items: center; /* Center align items vertically */
        }

        /* Style for the main questions textarea */
        #questions {
            height: 320px;
            resize: none;
            background-color: #f0f8ff;
            border: 2px solid #b0c4de;
            font-family: monospace;
            line-height: 1.5;
            color: #333;
            font-family: Times, serif;
        }

        #manual_this-is-my-question-number {
            height: 50px;
            resize: none;
            background-color: #fff;
            border: 2px solid #ccc;
            font-family: Times, serif;
        }

        .highlighted {
            background-color: #d1e7dd;
        }

        #submit_button {
            display: block;
            margin: 20px auto;
            padding: 10px;
            font-size: 1.25rem;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
            width: auto; /* Adjust button width to fit text */
        }

        #submit_button:hover {
            background-color: #0056b3;
        }

        .error-message {
            color: red;
            text-align: center;
            font-size: 0.9rem;
            display: none;
        }

        @media (max-width: 600px) {
            label, input, select, textarea {
                max-width: 100%;
            }

            h1 {
                font-size: 1.25rem;
            }

            .form-container {
                padding: 15px;
            }
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <div class="form-container">
        <form action="/submit_request" method="POST" class="form-container">
            <h1 style="color:#0056b3">CLIENT REPORTING TOOL</h1>

            <div class="form-row">
                <label for="client_id">Client ID:</label>
                <select id="client_id" name="client_id" required>
                    <option value="">Select Client ID</option>
                    {% for client_id in client_ids %}
                        <option value="{{ client_id }}">{{ client_id }}</option>
                    {% endfor %}
                </select>
            </div>

            <div class="form-row">
                <label>Select Service Type:</label>
                <div class="radio-group">
                    <label>
                        <input type="radio" name="service_type" value="service" id="service_option"> Service
                    </label>
                    <label>
                        <input type="radio" name="service_type" value="red_amber" id="red_amber_option"> Red Amber
                    </label>
                </div>
            </div>

            <div class="form-row" id="segment_name_field" style="display: none;">
                <label for="segment_name">Segment Name:</label>
                <select id="segment_name" name="segment_name" required>
                    <option value="">Select Segment</option>
                </select>
            </div>

            <div id="additional_fields" style="display: none;">
                <div class="form-row">
                    <label for="questions">Questions:</label>
                    <textarea id="questions" name="questions" readonly>
this is my question number 1
this is my question number 2
this is my question number 3
this is my question number 4
this is my question number 5
this is my question number 6
this is my question number 7
this is my question number 8
this is my question number 9
this is my question number 10
                    </textarea>
                </div>
                <input type="hidden" id="selected_line" name="selected_line">
                <input type="hidden" id="selected_text" name="selected_text">
                <div class="form-row">
                    <label for="manual_this-is-my-question-number">Manual Prompt:</label>
                    <textarea id="manual_this-is-my-question-number" name="manual_Prompt" placeholder="Enter your Prompt"></textarea>
                </div>
            </div>

            <p class="error-message" id="error_message" style="font-size:20px">Please select Client ID and Segment Name.</p>
            <button type="button" id="submit_button">Submit</button>
        </form>
    </div>

    <script>
        $(document).ready(function() {
            function checkFields() {
                const clientIdFilled = $('#client_id').val() !== "";
                const segmentNameFilled = $('#segment_name').val() !== "";

                if (clientIdFilled && segmentNameFilled) {
                    $('#additional_fields').show();
                    highlightLine(1);  // Initially highlight the first line
                    $('#error_message').hide();
                } else {
                    $('#additional_fields').hide();
                    $('#error_message').show();
                }
            }

            $('#client_id').change(function() {
                const clientId = $('#client_id').val();

                if (clientId) {
                    $('#error_message').hide();
                } else {
                    $('#segment_name_field').hide();
                    $('#additional_fields').hide();
                    $('#error_message').show();
                }
            });

            $('input[name="service_type"]').change(function() {
                if ($('#service_option').is(':checked')) {
                    $('#segment_name_field').show();  // Show Segment Name field
                    $('#segment_name').val(''); // Reset the segment name
                } else {
                    $('#segment_name_field').hide();  // Hide Segment Name field if Red Amber is selected
                }
            });

            $('#segment_name').change(checkFields);

            // Handle submit button click
            $('#submit_button').click(function() {
                if ($('#client_id').val() && $('#segment_name').val()) {
                    $('#error_message').hide();
                    $('form').submit();  // Proceed with form submission
                } else {
                    $('#error_message').show(); // Show error if fields are missing
                }
            });

            // Function to highlight a specified line in the textarea
            function highlightLine(lineNumber) {
                const textarea = document.getElementById('questions');
                const lines = textarea.value.split('\n');
                let start = 0;

                // Calculate the start and end positions for the line
                for (let i = 0; i < lineNumber - 1; i++) {
                    start += lines[i].length + 1; // Account for newlines
                }
                const end = start + lines[lineNumber - 1].length;

                // Highlight only the specified line
                textarea.focus();
                textarea.setSelectionRange(start, end);
            }

            // Function to set the default selected line to the first question (line 1)
            function setDefaultSelectedLine() {
                const textarea = document.getElementById('questions');
                const lines = textarea.value.split('\n');

                // Set the first line as selected by default
                const lineNumber = 1;
                highlightLine(lineNumber);

                // Store the selected line and text in hidden inputs
                $('#selected_line').val(lineNumber);
                $('#selected_text').val(lines[lineNumber - 1]); // First line text
            }

            setDefaultSelectedLine();

            // Event listener to handle line highlighting when the textarea is clicked
            $('#questions').on('click', function(e) {
                const textarea = e.target;
                const cursorPosition = textarea.selectionStart;
                const lines = textarea.value.split('\n');

                let start = 0, lineNumber = 0;

                // Determine which line the cursor is in based on the position
                for (let i = 0; i < lines.length; i++) {
                    if (cursorPosition >= start && cursorPosition <= start + lines[i].length) {
                        lineNumber = i + 1;
                        break;
                    }
                    start += lines[i].length + 1; // Account for newlines
                }

                highlightLine(lineNumber);

                $('#selected_line').val(lineNumber);
                $('#selected_text').val(lines[lineNumber - 1]);
            });
        });
    </script>
</body>
</html>
