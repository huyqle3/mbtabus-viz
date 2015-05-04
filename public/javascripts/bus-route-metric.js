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
			var inOut = $("input[name=inOut]:checked").val();
			// var year = $("select#year").val();
			var month = $("select#month").val();
			var metric = $("select#metric").val();

			$.ajax({
				url: "http://localhost:80/mbta-busses-website/public/server-side/bus-route-form.php",
				type: "POST",
				data: {
					busRoute: busRoute,
					inOut: inOut,
					// year: year,
					month: month,
					metric: metric
				},
				cache: false,
				success: function(){
					// success message
					clearAll();
					console.log("/data/" + month + "/" + metric + "/" + busRoute + "-" + inOut + ".tsv");
					if(metric == "run-time-bar"){
						var bar = metric.substring(0, 8);
						if(month == "July" || month == "August" || month == "September" || month == "October" || month == "November" || month == "December"){
							runTimeBar(busRoute, inOut, "2012", month, bar, "chart1", "success1");
							runTimeBar(busRoute, inOut, "2013", month, bar, "chart2", "success2");
						}else{
							runTimeBar(busRoute, inOut, "2013", month, bar, "chart1", "success1");
							runTimeBar(busRoute, inOut, "2014", month, bar, "chart2", "success2");
						}
					}else if(metric == "run-time-line"){
						var line = metric.substring(0, 8);
						if(month == "July" || month == "August" || month == "September" || month == "October" || month == "November" || month == "December"){
							runTimeLine(busRoute, inOut, "2012", month, line, "chart1");
							runTimeLine(busRoute, inOut, "2013", month, line, "chart2");
						}else{
							runTimeLine(busRoute, inOut, "2013", month, line, "chart1");
							runTimeLine(busRoute, inOut, "2014", month, line, "chart2");
						}
					}else if(metric == "actual-vs-scheduled"){
						if(month == "July" || month == "August" || month == "September" || month == "October" || month == "November" || month == "December"){
							actualVsScheduled(busRoute, inOut, "2012", month, metric, "chart1", "success1");
							actualVsScheduled(busRoute, inOut, "2013", month, metric, "chart2", "success2");
						}else{
							actualVsScheduled(busRoute, inOut, "2013", month, metric, "chart1", "success1");
							actualVsScheduled(busRoute, inOut, "2014", month, metric, "chart2", "success2");
						}
					}else if(metric == "headway"){
						if(month == "July" || month == "August" || month == "September" || month == "October" || month == "November" || month == "December"){
							headway(busRoute, inOut, "2012", month, metric, "chart1", "success3");
							headway(busRoute, inOut, "2013", month, metric, "chart2", "success4");
						}else{
							headway(busRoute, inOut, "2013", month, metric, "chart1", "success3");
							headway(busRoute, inOut, "2014", month, metric, "chart2", "success4");
						}
					}else{
						if(month == "July" || month == "August" || month == "September" || month == "October" || month == "November" || month == "December"){
							waitTimeLine(busRoute, inOut, "2012", month, metric, "chart1", "success3");
							waitTimeLine(busRoute, inOut, "2013", month, metric, "chart2", "success4");
						}else{
							waitTimeLine(busRoute, inOut, "2013", month, metric, "chart1", "success3");
							waitTimeLine(busRoute, inOut, "2014", month, metric, "chart2", "success4");
						}
					}
					// clear all fields
					$('#routeForm').trigger("reset");
				},
				error: function() {
					// Fail message
					$('#success1').html('ERROR');
					$('#success2').html('ERROR');

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

function clearAll(){
	$("#success1").empty();
	$(".chart1").empty();
	$("#success2").empty();
	$(".chart2").empty();
	$("#success3").empty();
	$("#success4").empty();
}

function runTimeBar(busRoute, inOut, year, month, metric, chartNumber, success){
	$('#' + success).html("<p>Date: " + month + ", " + year + "</p><p>Route: " + busRoute + " " + inOut + "</p><p>Metric: " + metric + "</p>");

	var width = 440,
    barHeight = 12;

	var x = d3.scale.linear()
	    .range([0, width]);

	var chart = d3.select("." + chartNumber).append("svg")
	    .attr("width", width)
	    .attr("class", "col-md-6");

	var path = "/data/" + year + "/" + month + "/" + metric + "/" + busRoute + "-" + inOut + ".tsv";
	d3.tsv(path, type, function(error, data) {
	  x.domain([0, d3.max(data, function(d) { return d.close; })]);

	  chart.attr("height", barHeight * data.length);

	  var bar = chart.selectAll("g")
	      .data(data)
	    .enter().append("g")
	      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

	  bar.append("rect")
	      .attr("width", function(d) { return x(d.close); })
	      .attr("height", barHeight - 1)
	      .style("fill", "green");

	  bar.append("text")
	      .attr("x", function(d) { return x(d.close) - 3; })
	      .attr("y", barHeight / 2)
	      .attr("dy", ".35em")
	      .text(function(d) { return d.close; })
	      .style({"fill": "white", "font": "10px tahoma", "text-anchor": "end"});

	  bar.append("text")
	      .attr("x", 30)
	      .attr("y", barHeight / 2)
	      .attr("dy", ".35em")
	      .text(function(d) { return d.date; })
	      .style({"fill": "white", "font": "10px tahoma", "text-anchor": "end"});
	});

	$("path").css("fill", "none");
}

function runTimeLine(busRoute, inOut, year, month, metric, chartNumber){
	$('.' + chartNumber).html("<br><p>Date: " + month + ", " + year + "</p><p>Route: " + busRoute + " " + inOut + "</p><p>Metric: " + metric + "</p>");

	var margin = {top: 20, right: 20, bottom: 20, left: 50},
    width = 1200 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom;

	var parseDate = d3.time.format("%H:%M").parse;

	var x = d3.time.scale()
	    .domain([5, 24])
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .ticks(d3.time.hours, 1)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var line = d3.svg.line()
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.close); });

	var svg = d3.select("." + chartNumber).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var path = "/data/" + year + "/" + month + "/" + metric + "/" + busRoute + "-" + inOut + ".tsv";
	d3.tsv(path, function(error, data) {
	  data.forEach(function(d) {
	    d.date = parseDate(d.date);
	    d.close = +d.close;
	  });

	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain(d3.extent(data, function(d) { return d.close; }));

	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .style({"stroke-width": "0.1px", "stroke": "#000", "shape-rendering": "crispEdges"})
	    .call(xAxis);

	svg.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .style({"stroke-width": "0.1px", "stroke": "#000", "shape-rendering": "crispEdges"})
	    .append("text")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 10)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Avg trip duration (mins)");

	svg.append("path")
	    .datum(data)
	    .attr("class", "line")
	    .attr("d", line)
	    .style({"fill": "none", "stroke": "steelblue", "stroke-width": "2.5px"});
	});
}

function actualVsScheduled(busRoute, inOut, year, month, metric, chartNumber, success){
	$('#' + success).html("<p>Date: " + month + ", " + year + "</p><p>Route: " + busRoute + " " + inOut + "</p><p>Metric: " + metric + "</p>");
	// var width = 2200, barHeight = 12;
	var width = 500, barHeight = 12;

	var x = d3.scale.linear()
	    .range([0, width]);

	var chart = d3.select("." + chartNumber).append("svg")
	    .attr("width", width)
	    .attr("class", "col-md-6");

	var path = "/data/" + year + "/" + month + "/" + metric + "/" + busRoute + "-" + inOut + ".tsv";
	d3.tsv(path, type, function(error, data) {
	  x.domain([0, d3.max(data, function(d) { return d.close; })]);
	  //x.domain([0, 20]);
	  //d3.max(data, function(d) { return d.close; })]);

	  chart.attr("height", barHeight * data.length);

	  var bar = chart.selectAll("g")
	      .data(data)
	    .enter().append("g")
	      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

	  bar.append("rect")
	      .attr("width", function(d) { return x(d.close); })
	      .attr("height", barHeight - 1)
	      .style("fill", "green");

	  bar.append("text")
	      .attr("x", function(d) { return x(d.close) - 1; })
	      .attr("y", barHeight / 2)
	      .attr("dy", ".35em")
	      .text(function(d) { return d.close; })
	      .style({"fill": "white", "font": "10px tahoma", "text-anchor": "end"});

	  bar.append("text")
	      .attr("x", 25)
	      .attr("y", barHeight / 2)
	      .attr("dy", ".35em")
	      .text(function(d) { return d.date; })
	      .style({"fill": "white", "font": "10px tahoma", "text-anchor": "end"});
	});
}


function waitTimeLine(busRoute, inOut, year, month, metric, chartNumber, success){
	$('#' + success).html("<br><div class='input-color'><input type='text' value='Average Actual Wait Time' style='width:300px; text-align: center;'/><div class='color-box' style='background-color: #000000;'></div></div><div class='input-color'><input type='text' value='Average Scheduled Wait Time' style='width:300px; text-align: center;'/>    <div class='color-box' style='background-color: #FF0000;'></div></div><br>");
	$('.' + chartNumber).html("<p>Date: " + month + ", " + year + "</p><p>Route: " + busRoute + " " + inOut + "</p><p>Metric: " + metric + "</p>");

	var margin = {top: 20, right: 20, bottom: 20, left: 50},
    width = 1200 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom;

	var parseDate = d3.time.format("%H:%M").parse;

	var x = d3.time.scale()
	    .domain([5, 24])
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);


	var xAxis = d3.svg.axis()
	    .scale(x)
	    .ticks(d3.time.hours, 1)
	    .orient("bottom");


	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var line = d3.svg.line()
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.actual); });

	var line2 = d3.svg.line()
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.close); });

	var svg = d3.select("." + chartNumber).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var path = "/data/" + year + "/" + month + "/" + metric + "/" + busRoute + "-" + inOut + ".tsv";
	d3.tsv(path, function(error, data) {
	  data.forEach(function(d) {
	    d.date = parseDate(d.date);
	    d.close = +d.close;
	  });

	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain(d3.extent(data, function(d) { return d.close; }));

	svg.append("g")
	    .attr("class", "x axis")
	    .style({"stroke-width": "0.1px", "stroke": "grey", "shape-rendering": "crispEdges"})
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);

	svg.append("g")
	    .attr("class", "y axis")
	    .style({"stroke-width": "0.1px", "stroke": "grey", "shape-rendering": "crispEdges"})
	    .call(yAxis)
	    .append("text")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 10)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Avg Wait Time");

	svg.append("path")
	    .datum(data)
	    .attr("class", "line")
	    .attr("d", line)
	    .attr("stroke-width", 2)
		.attr("stroke", 'black')
		.style("fill", "none");

	svg.append("path")
	    .datum(data)
	    .attr("class", "line")
	    .attr("d", line2)
	    .style("stroke-dasharray", ("3, 3"))
		.attr("stroke-width", 3)
		.attr("stroke", 'red')
		.style("fill", "none");
	});
}


function headway(busRoute, inOut, year, month, metric, chartNumber, success){
	$('#' + success).html("<br><div class='input-color'><input type='text' value='Average Actual Headway' style='width:300px; text-align: center;'/><div class='color-box' style='background-color: #000000;'></div></div><div class='input-color'><input type='text' value='Average Scheduled Headway' style='width:300px; text-align: center;'/>    <div class='color-box' style='background-color: #FF0000;'></div></div><br>");
	$('.' + chartNumber).html("<p>Date: " + month + ", " + year + "</p><p>Route: " + busRoute + " " + inOut + "</p><p>Metric: " + metric + "</p>");

	var margin = {top: 20, right: 20, bottom: 20, left: 50},
    width = 1200 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom;
	var parseDate = d3.time.format("%H:%M").parse;
	var x = d3.time.scale()
	    .domain([0, 25])
	    .range([0, width]);
	var y = d3.scale.linear()
	    .range([height, 0]);
	var xAxis = d3.svg.axis()
	    .scale(x)
	    .ticks(d3.time.hours, 1)
	    .orient("bottom");
	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");
		
	//Define the line
	var valueline = d3.svg.line()
	    .x(function(d) { 
		 if (d.AvgStartTime > 0 && d.AvgStartTime < 1439) { //Bound for end of this day (11:59pm = 1439 mins)
		    return x(d.mytime);} })
	    .y(function(d) { return y(d.AvgAct); });
		
	//Define the second line
	var valueline2 = d3.svg.line()
		.x(function(d) { 
		if (d.AvgStartTime > 0 && d.AvgStartTime < 1439) { //Bound for end of this day (11:59pm = 1439 mins)
		return x(d.mytime);} })
	    .y(function(d) { return y(d.AvgSch); });
		
	var svg = d3.select("." + chartNumber).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//Declaring the variables we need to convert to hours::minutes string
	var hour; 
	var hour_str;
	var min; 
	var min_str;
	var prefix_str = "2013-03-01T";
	var HMtime = d3.time.format("%H:%M");

	//Retrieve the data
	var path = "/data/" + year + "/" + month + "/" + metric + "/" + busRoute + "-" + inOut + ".csv";
	d3.csv(path, function(error, data) {
	  data.forEach(function(d) {
	  d.AvgStartTime = +d.AvgStartTime; //Set this to StartTimeInMin before we convert it
	  hour = Math.floor(d.AvgStartTime/ 60); //Gives us the hour
			hour_str = hour.toString();	//Convert hour to string
				if (hour_str.length == 1) { //We add a 0 in front for correct formatting
					hour_str = "0" + hour_str;
					} 
		min = Math.floor(d.AvgStartTime % 60); //Converts to minutes
			min_str = min.toString();
				if (hour_str.length == 1) { //We add a 0 in front for correct formatting
					min_str = "0" + min_str;
					} 
		HMtime = hour_str + ":" + min_str; //Concatenate the substrings above to form HH:MM formatted string
		
		d.mytime = parseDate(HMtime);
	    d.AvgAct = +d.AvgAct;
		d.AvgSch = +d.AvgSch;
		 
	  });
	  
	  x.domain(d3.extent(data, function(d) { 
	  
	if (d.AvgStartTime > 0 && d.AvgStartTime < 1439) { //Bound for end of this day (11:59pm = 1439 mins)
	 
	  return d.mytime;}  }));
	  y.domain(d3.extent(data, function(d) { return d.AvgAct; }));
	  /* svg.append("path")
	      .datum(data)
	      .attr("class", "line")
	      .attr("d", line);
		  */
		
		// Add the valueline path.
	    svg.append("path")		
	        .attr("class", "line")	
	        .attr("d", valueline(data))
			.attr("stroke-width", 2)
			.attr("stroke", 'black')
			.style("fill", "none");
		//Add the valueline2 path
		svg.append("path")		
			.attr("class","line")
	        .attr("d", valueline2(data))
			.style("stroke-dasharray", ("3, 3"))
			.attr("stroke-width", 3)
			.attr("stroke", 'red')
			.style("fill", "none");

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .style({"stroke-width": "0.1px", "stroke": "grey", "shape-rendering": "crispEdges"})
	      .call(xAxis);
	  svg.append("g")
	      .attr("class", "y axis")
	      .style({"stroke-width": "0.1px", "stroke": "grey", "shape-rendering": "crispEdges"})
	      .call(yAxis)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", -40)
		  .attr("x", -120)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Headway (in mins)");
	});
}

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}

/*Function to close out the graph. Not implemented at the moment */
$('#name').focus(function() {
    $('#success1').html('');
    $('#success2').html('');
});