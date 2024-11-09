<script>
        $(document).ready(function() {
            // Function to check if both Client ID and Segment Name fields are filled
            function checkFields() {
                const clientIdFilled = $('#client_id').val() !== "";
                const segmentNameFilled = $('#segment_name').val() !== "";
                
                if (clientIdFilled && segmentNameFilled) {
                    $('#additional_fields').show();
                } else {
                    $('#additional_fields').hide();
                }
            }

            // Show Segment Name dropdown and populate it based on Client ID selection
            $('#client_id').change(function() {
                const clientId = $('#client_id').val();
                if (clientId) {
                    // Show Segment Name dropdown if Client ID is selected
                    $('#segment_name_field').show();
                    
                    // Simulate an AJAX request to populate Segment Name dropdown
                    // Replace with actual AJAX call in a real app
                    $('#segment_name').html('<option value="">Select Segment</option>');
                    // Sample segments based on the selected Client ID
                    $('#segment_name').append('<option value="Segment1">Segment1</option>');
                    $('#segment_name').append('<option value="Segment2">Segment2</option>');
                } else {
                    $('#segment_name_field').hide();
                    $('#additional_fields').hide();
                }
            });

            // Check both fields before showing additional fields
            $('#segment_name').change(checkFields);

            // Function to highlight the first line in the textarea
            function selectFirstLine() {
                const textarea = document.getElementById('questions');
                textarea.focus();
                textarea.setSelectionRange(0, textarea.value.indexOf('\n'));
            }

            // Highlight the first line when Segment Name is selected
            $('#segment_name').change(selectFirstLine);
        });
    </script>
