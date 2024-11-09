// Show Segment Name dropdown and fetch unique segments based on Client ID
            $('#client_id').change(function() {
                const clientId = $(this).val();
                
                if (clientId) {
                    $.ajax({
                        url: '/get_segments',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({ client_id: clientId }),
                        success: function(response) {
                            // Populate the Segment dropdown with the retrieved segments
                            $('#segment_name').empty().append('<option value="">Select Segment</option>');
                            response.segments.forEach(function(segment) {
                                $('#segment_name').append(`<option value="${segment}">${segment}</option>`);
                            });
                            $('#segment_name_field').show();
                        }
                    });
                } else {
                    $('#segment_name_field').hide();
                    $('#additional_fields').hide();
                }
            });
