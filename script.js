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
            margin-bottom: 10px;
        }

        label {
            width: 35%;
            margin-bottom: 0;
            font-weight: bold;
            color: #555;
            font-size: 20px;
        }

        input, select, textarea {
            width: 65%;
            padding: 8px;
            font-size: 20px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }

        .radio-group {
            display: flex;
            align-items: center;
            width: 65%; /* Consistent width */
        }

        .radio-group label {
            margin-right: 20px; /* Space between radio buttons */
            display: flex;
            align-items: center; /* Center align items vertically */
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

        #additional_fields {
            display: none; /* Initially hidden */
        }

        .highlighted {
            background-color: #d1e7dd; /* Highlight color */
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <div class="form-container">
        <form id="reportingForm">
            <h1>CLIENT REPORTING TOOL</h1>

            <div class="form-row">
                <label for="client_id">Client ID:</label>
                <select id="client_id" name="client_id" required>
                    <option value="">Select Client ID</option>
                    <option value="client1">Client 1</option>
                    <option value="client2">Client 2</option>
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
                    <option value="segment1">Segment 1</option>
                    <option value="segment2">Segment 2</option>
                </select>
            </div>

            <div id="additional_fields">
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
                <div class="form-row">
                    <label for="manual_prompt">Manual Prompt:</label>
                    <textarea id="manual_prompt" name="manual_prompt" placeholder="Enter your Prompt"></textarea>
                </div>
            </div>

            <div class="error-message" id="error_message">Please select Client ID and Segment Name.</div>
            <button type="button" id="submit_button">Submit</button>
        </form>
    </div>

    <script>
        $(document).ready(function() {
            $('#client_id').change(function() {
                // Reset the form fields when the client ID changes
                $('#segment_name').val(''); // Reset segment name
                $('#segment_name_field').hide(); // Hide segment name field
                $('#additional_fields').hide(); // Hide additional fields
                $('input[name="service_type"]').prop('checked', false); // Reset radio buttons
                $('#error_message').hide(); // Hide error message
            });

            $('input[name="service_type"]').change(function() {
                if ($('#service_option').is(':checked')) {
                    $('#segment_name_field').show();  // Show Segment Name field
                    $('#questions').val(`this is my question number 1\nthis is my question number 2`); // Set default questions
                    $('#additional_fields').show(); // Show additional fields
                } else {
                    $('#segment_name_field').hide();  // Hide Segment Name field if Red Amber is selected
                    $('#segment_name').val(''); // Reset the segment name
                    $('#additional_fields').show(); // Show additional fields with only 2 questions
                    $('#questions').val(`this is my question number 1\nthis is my question number 2`); // Set default questions
                }
            });

            $('#segment_name').change(function() {
                // Show additional fields when a segment is selected
                if ($(this).val()) {
                    $('#additional_fields').show();
                    highlightQuestion(1); // Highlight the first question by default
                    $('#error_message').hide();
                } else {
                    $('#additional_fields').hide();
                }
            });

            $('#submit_button').click(function() {
                const clientIdFilled = $('#client_id').val() !== "";
                const segmentNameFilled = $('#segment_name').val() !== "";

                if (clientIdFilled && segmentNameFilled) {
                    $('#error_message').hide();
                    // Proceed with form submission
                    alert("Form submitted successfully!");
                } else {
                    $('#error_message').show(); // Show error if fields are missing
                }
            });

            function highlightQuestion(lineNumber) {
                const textarea = document.getElementById('questions');
                const lines = textarea.value.split('\n');

                // Ensure lineNumber is within bounds
                if (lineNumber > 0 && lineNumber <= lines.length) {
                    let start = 0;

                    // Calculate the start position for the line
                    for (let i = 0; i < lineNumber - 1; i++) {
                        start += lines[i].length + 1; // Account for newlines
                    }
                    const end = start + lines[lineNumber - 1].length;

                    // Highlight the specified line
                    textarea.focus();
                    textarea.setSelectionRange(start, end);
                    textarea.classList.add('highlighted'); // Add highlight class

                    // Clear highlight after a short delay
                    setTimeout(() => {
                        textarea.classList.remove('highlighted');
                    }, 2000); // Remove highlight after 2 seconds
                }
            }

            // Click event on textarea to select question
            $('#questions').click(function(e) {
                const textarea = this;
                const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
                const y = e.clientY - textarea.getBoundingClientRect().top; // Get Y position within the textarea
                const lineNumber = Math.floor(y / lineHeight); // Calculate the line number from the Y position

                // Check if the line number is valid
                if (lineNumber >= 0 && lineNumber < textarea.value.split('\n').length) {
                    highlightQuestion(lineNumber + 1); // Highlight the selected question (1-based index)
                }
            });

            // Initialize with the first question highlighted if a client is selected
            $('#client_id').change(function() {
                if ($(this).val()) {
                    highlightQuestion(1); // Highlight the first question when a client is selected
                }
            });
        });
    </script>
</body>
</html>
