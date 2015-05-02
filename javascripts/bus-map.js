// utilizing Google Map API to generate a map
var map;

function initialize() {
    var mapOptions = {
        center: {lat: 42.348570, lng: -71.095233},
        zoom: 13,
        mapTypeControl: false
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

var markerPositions = new Array();
var markerArray = new Array();
var polyline = new Array();

// called back function that can use parsed data
function createMarker(data){

    for(var i = 1; i < data.length-1; i++){
        var markerPosition = new google.maps.LatLng(data[i][2], data[i][3]);
        markerPositions.push(markerPosition);

        var marker = new google.maps.Marker({
            icon: ('images/bus.png'),
            position: markerPosition,
            map: map,
            title: data[i][1]
        });

        markerArray.push(marker);
    }

    polyline = new google.maps.Polyline({
        path: markerPositions,
        geodesic: true,
        strokeColor: '#1f98d9',
        strokeOpacity: 1.0,
        strokeWeight: 5
    });

    // Debug test
    /*
    var flightPlanCoordinates = [
        new google.maps.LatLng(42.363021, -71.058290),
        new google.maps.LatLng(42.357494, -71.056252),
        new google.maps.LatLng(42.350594, -71.075287),
        new google.maps.LatLng(42.356728, -71.057480)
    ];

    for(var i = 0; i < flightPlanCoordinates.length; i++){
        markerArray[i] = new google.maps.Marker({
            icon: ('images/bus.png'),
            position: flightPlanCoordinates[i],
            map: map,
            title: "hello world"
        });
    }

    polyline = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#1f98d9',
        strokeOpacity: 1.0,
        strokeWeight: 5
    });
    */

    polyline.setMap(map);
}


function parseData(url, callback){
    Papa.parse(url, {
        download: true,
        complete: function(results){
            callback(results.data);
        }
    });
}

function clearMarkers(markerArray) {
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }
}

// parseData("data/route57_stops.csv", map);


$('#route1').change(function() {
    if($('#route1').prop("checked")) {
        parseData("data/15-key-bus-routes/route1/stops.txt", createMarker);
    }
    else{
        clearMarkers(markerArray);
        markerPositions = [];
        markerArray = [];
        polyline.setMap(null);
    }
});

$('#route15').change(function() {
    if($('#route15').prop("checked")) {
        // run the function with the csv and a callback
        parseData("data/15-key-bus-routes/route15/stops.txt", route15, connectedCoordinatesRoute15, pathRoute15, createMarker);
        parseData("data/15-key-bus-routes/route15/stops.txt", secondRoute15, secondConnectedCoordinatesRoute15, secondPathRoute15, createMarker2);
    }
    else{
        removeMarkersAndLines(route15, secondRoute15, pathRoute15, secondPathRoute15);
    }
});

$('#route22').change(function() {
    if($('#route22').prop("checked")) {
        // run the function with the csv and a callback
        parseData("data/15-key-bus-routes/route22/stops.txt", route22, connectedCoordinatesRoute22, pathRoute22, createMarker);
        parseData("data/15-key-bus-routes/route22/stops.txt", secondRoute22, secondConnectedCoordinatesRoute22, secondPathRoute22, createMarker2);
    }
    else{
        removeMarkersAndLines(route22, secondRoute22, pathRoute22, secondPathRoute22);
    }
});

$('#route23').change(function() {
    if($('#route23').prop("checked")) {
        // run the function with the csv and a callback
        parseData("data/15-key-bus-routes/route23/stops.txt", route23, connectedCoordinatesRoute23, pathRoute23, createMarker);
        parseData("data/15-key-bus-routes/route23/stops.txt", secondRoute23, secondConnectedCoordinatesRoute23, secondPathRoute23, createMarker2);
    }
    else{
        removeMarkersAndLines(route23, secondRoute23, pathRoute23, secondPathRoute23);
    }
});

$('#route28').change(function() {
    if($('#route28').prop("checked")) {
        // run the function with the csv and a callback
        parseData("data/15-key-bus-routes/route28/stops.txt", route28, connectedCoordinatesRoute28, pathRoute28, createMarker);
        parseData("data/15-key-bus-routes/route28/stops.txt", secondRoute28, secondConnectedCoordinatesRoute28, secondPathRoute28, createMarker2);
    }
    else{
        removeMarkersAndLines(route28, secondRoute28, pathRoute28, secondPathRoute28);
    }
});

$('#route57').change(function() {
    if($('#route57').prop("checked")) {
        // run the function with the csv and a callback
        parseData("data/15-key-bus-routes/route57/stops.txt", route57, connectedCoordinatesRoute57, pathRoute57, createMarker);
        parseData("data/15-key-bus-routes/route57/stops.txt", secondRoute57, secondConnectedCoordinatesRoute57, secondPathRoute57, createMarker2);
    }
    else{
        removeMarkersAndLines(route57, secondRoute57, pathRoute57, secondPathRoute57);
    }
});


// Yue's data files
$('#route32').change(function() {
    if($('#route32').prop("checked")) {
        // run the function with the csv and a callback
        parseData("data/15-key-bus-routes/route32/stops.txt", route32, connectedCoordinatesRoute32, pathRoute32, createMarker);
        parseData("data/15-key-bus-routes/route32/stops.txt", secondRoute32, secondConnectedCoordinatesRoute32, secondPathRoute1, createMarker2);
    }
    else{
        removeMarkersAndLines(route32, secondRoute32, pathRoute32, secondPathRoute32);
    }
});

$('#route39').change(function() {
    if($('#route39').prop("checked")) {
        // run the function with the csv and a callback
        parseData("data/15-key-bus-routes/route39/stops.txt", route39, connectedCoordinatesRoute39, pathRoute39, createMarker);
        parseData("data/15-key-bus-routes/route39/stops.txt", secondRoute39, secondConnectedCoordinatesRoute39, secondPathRoute39, createMarker2);
    }
    else{
        removeMarkersAndLines(route39, secondRoute39, pathRoute39, secondPathRoute39);
    }
});

$('#route66').change(function() {
    if($('#route66').prop("checked")) {
        // run the function with the csv and a callback
        parseData("data/15-key-bus-routes/route66/stops.txt", route66, connectedCoordinatesRoute66, pathRoute66, createMarker);
        parseData("data/15-key-bus-routes/route66/stops.txt", secondRoute66, secondConnectedCoordinatesRoute66, secondPathRoute66, createMarker2);
    }
    else{
        removeMarkersAndLines(route66, secondRoute66, pathRoute66, secondPathRoute66);
    }
});

$('#route71').change(function() {
    if($('#route71').prop("checked")) {
        // run the function with the csv and a callback
        parseData("data/15-key-bus-routes/route71/stops.txt", route71, connectedCoordinatesRoute71, pathRoute71, createMarker);
        parseData("data/15-key-bus-routes/route71/stops.txt", secondRoute71, secondConnectedCoordinatesRoute71, secondPathRoute71, createMarker2);
    }
    else{
        removeMarkersAndLines(route71, secondRoute71, pathRoute71, secondPathRoute71);
    }
});

$('#route73').change(function() {
    if($('#route73').prop("checked")) {
        // run the function with the csv and a callback
        parseData("data/15-key-bus-routes/route73/stops.txt", route73, connectedCoordinatesRoute73, pathRoute73, createMarker);
        parseData("data/15-key-bus-routes/route73/stops.txt", secondRoute73, secondConnectedCoordinatesRoute73, secondPathRoute73, createMarker2);
    }
    else{
        removeMarkersAndLines(route73, secondRoute73, pathRoute73, secondPathRoute73);
    }
});

$('#route77').change(function() {
    if($('#route77').prop("checked")) {
        // run the function with the csv and a callback
        parseData("data/15-key-bus-routes/route77/stops.txt", route77, connectedCoordinatesRoute77, pathRoute77, createMarker);
        parseData("data/15-key-bus-routes/route77/stops.txt", secondRoute77, secondConnectedCoordinatesRoute77, secondPathRoute77, createMarker2);
    }
    else{
        removeMarkersAndLines(route77, secondRoute77, pathRoute77, secondPathRoute77);
    }
});

$('#route111').change(function() {
    if($('#route111').prop("checked")) {
        // run the function with the csv and a callback
        parseData("data/15-key-bus-routes/route111/stops.txt", route111, connectedCoordinatesRoute111, pathRoute111, createMarker);
        parseData("data/15-key-bus-routes/route111/stops.txt", secondRoute111, secondConnectedCoordinatesRoute111, secondPathRoute111, createMarker2);
    }
    else{
        removeMarkersAndLines(route111, secondRoute111, pathRoute111, secondPathRoute111);
    }
});

$('#route116').change(function() {
    if($('#route116').prop("checked")) {
        // run the function with the csv and a callback
        parseData("data/15-key-bus-routes/route116/stops.txt", route116, connectedCoordinatesRoute116, pathRoute116, createMarker);
        parseData("data/15-key-bus-routes/route116/stops.txt", secondRoute116, secondConnectedCoordinatesRoute116, secondPathRoute116, createMarker2);
    }
    else{
        removeMarkersAndLines(route116, secondRoute116, pathRoute116, secondPathRoute116);
    }
});

$('#route117').change(function() {
    if($('#route117').prop("checked")) {
        // run the function with the csv and a callback
        parseData("data/15-key-bus-routes/route117/stops.txt", route117, connectedCoordinatesRoute117, pathRoute117, createMarker);
        parseData("data/15-key-bus-routes/route117/stops.txt", secondRoute117, secondConnectedCoordinatesRoute117, secondPathRoute117, createMarker2);
    }
    else{
        removeMarkersAndLines(route117, secondRoute117, pathRoute117, secondPathRoute117);
    }
});

// manually grab the CSV file and process data
/*
$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "data.txt",
        dataType: "text",
        success: function(data){
            processData(data);
        }
    });
});

function processData(text){
    var record_num = 46;
    var textLines = text.split(/\r\n|\n/);
    var entries = textLines[0].split(',');
    var lines = [];

    var headings = entries.splice(0, record_num);
    while (entries.length > 0){
        var tarr = [];
        for(var j = 0; j < record_num; j++){
            tarr.push(headings[j] + ":" + entries.shift());
        }
        lines.push(tarr);
    }
}
*/

// loading the Google Map
google.maps.event.addDomListener(window, 'load', initialize);

// utilizing the d3.js visualization for bus routes
/*
d3.csv("data/shapes.txt", function(d){

	var margin = {top: 10, right: 10, bottom: 20, left: 40},
		width = 500 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var x = d3.scale.linear()
    	.domain([-100, 100])
    	.range([-100, width]);

	var y = d3.scale.linear()
    	.domain([0, 100])
    	.range([height, 0]);

    var xAxis = d3.svg.axis()
    	.scale(x)
    	.orient("bottom");

	var yAxis = d3.svg.axis()
    	.scale(y)
    	.orient("left");

    var line = d3.svg.line()
    	.x(function(d) {return x(d.shape_pt_lon); })
    	.y(function(d) {return y(d.shape_pt_lat); });
    	//.x(function(d) {return x(d.x); })
    	//.y(function(d) {return y(d.y); });

    var svg = d3.select("body").append("svg")
    	.datum(d)
    	.attr("width", width + margin.left + margin.right)
    	.attr("height", height + margin.top + margin.bottom)
      .append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(0," + height + ")")
    	.call(xAxis);

	svg.append("g")
    	.attr("class", "y axis")
    	.call(yAxis);

	svg.append("path")
    	.attr("class", "line")
    	.attr("d", line);
    */
    /*
    svg.selectAll(".dot")
    	.data(d)
      .enter().append("circle")
      	.attr("class", "dot")
      	.attr("cx", line.x())
      	.attr("cy", line.y())
      	.attr("r", 3.5);
	*/

    /*
	return {
		shape_id: d.shape_id,
		shape_lat: d.shape_pt_lat,
		shape_lon: d.shape_pt_lon,
		shape_sequence: d.shape_pt_sequence,
		shape_traveled: d.shape_dist_traveled
	};
	*/
//});
