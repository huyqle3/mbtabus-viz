$(function(){
	$("select,input").jqBootstrapValidation({
		preventSubmit: true,
		submitError: function($form, event, errors){
			//additional error messages or events
		},
		submitSuccess: function($form, event){
			//prevent default submit behavior
			event.preventDefault();
			// get values from FORM
			var busRoute = $("select#busRoute").val();
			var inOut = $('input#inOut:checked').val();
			var year = $("select#year").val();
			var month = $("select#month").val();
			var metric = $("select#actual-vs-scheduled").val();

			$.ajax({
				url: "././server-side/bus-route-form.php",
				type: "POST",
				data: {
					busRoute: busRoute,
					inOut: inOut,
					year: year,
					month: month,
					metric: metric
				},
				cache: false,
				success: function(){
					// Success message
					$('#success').html("<p>Infomation is: " + busRoute + inOut + year + month + metric + '</p>');
				
					// clear all fields
					$('#routeForm').trigger("reset");
				},
				error: function() {
					// Fail message
					$('#success').html('ERROR');

					//clear all fields
					$('#routeForm').trigger("reset");
				},
			})
		},

		filter: function() {
			return $(this).is(":visible");
		},
	});
	
	$("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});