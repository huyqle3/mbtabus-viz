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

var markerPositions1 = new Array();
var markerArray1 = new Array();
var polyline1 = new Array();

var markerPositions15 = new Array();
var markerArray15 = new Array();
var polyline15 = new Array();

var markerPositions22 = new Array();
var markerArray22 = new Array();
var polyline22 = new Array();

var markerPositions23 = new Array();
var markerArray23 = new Array();
var polyline23 = new Array();

var markerPositions28 = new Array();
var markerArray28 = new Array();
var polyline28 = new Array();

var markerPositions32 = new Array();
var markerArray32 = new Array();
var polyline32 = new Array();

var markerPositions39 = new Array();
var markerArray39 = new Array();
var polyline39 = new Array();

var markerPositions57 = new Array();
var markerArray57 = new Array();
var polyline57 = new Array();

var markerPositions66 = new Array();
var markerArray66 = new Array();
var polyline66 = new Array();

var markerPositions71 = new Array();
var markerArray71 = new Array();
var polyline71 = new Array();

var markerPositions73 = new Array();
var markerArray73 = new Array();
var polyline73 = new Array();

var markerPositions77 = new Array();
var markerArray77 = new Array();
var polyline77 = new Array();

var markerPositions111 = new Array();
var markerArray111 = new Array();
var polyline111 = new Array();

var markerPositions116 = new Array();
var markerArray116 = new Array();
var polyline116 = new Array();

var markerPositions117 = new Array();
var markerArray117 = new Array();
var polyline117 = new Array();

var actualMarker = new Array();
var content = new Array();
var infoWindows = new Array();

/*
var actualMarker15 = new Array();
var content15 = new Array();
var infoWindows15 = new Array();
*/

// called back function that can use parsed data
function createMarker(data, id, pos, array, poly){
    
    for(var i = 1; i < data.length-1; i++){
        // console.log(actualMarker);
        var markerPosition = new google.maps.LatLng(data[i][2], data[i][3]);
        pos.push(markerPosition);

        actualMarker[i-1] = new google.maps.Marker({
            icon: ('images/bus.png'),
            position: markerPosition,
            map: map,
            title: data[i][1]
        });

        /*
        var marker = new google.maps.Marker({
            icon: ('images/bus.png'),
            position: markerPosition,
            map: map,
            title: data[i][1]
        });
        */

        actualMarker[i-1].index = i-1;

        content[i-1] = String(data[i][1]);

        infoWindows[i-1] = new google.maps.InfoWindow({
            content: content[i-1]
        });

        array.push(actualMarker[i-1]);
        // array.push(marker);
        
        google.maps.event.addListener(array[i-1], 'click', function() {
            infoWindows[this.index].open(map, actualMarker[this.index]);
        });
    }

    poly = new google.maps.Polyline({
        path: pos,
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
    switch(id){
        case "route1":
            polyline1 = poly;
        case "route15":
            polyline15 = poly;
        case "route22":
            polyline22 = poly;
        case "route23":
            polyline23 = poly;
        case "route28":
            polyline28 = poly;
        case "route32":
            polyline32 = poly;
        case "route39":
            polyline39 = poly;
        case "route57":
            polyline57 = poly;
        case "route66":
            polyline66 = poly;
        case "route71":
            polyline71 = poly;
        case "route73":
            polyline73 = poly;
        case "route77":
            polyline77 = poly;
        case "route111":
            polyline111 = poly;
        case "route116":
            polyline116 = poly;
        case "route117":
            polyline117 = poly;
    }

    poly.setMap(map);
}


function parseData(url, id, markerPositions, markerArray, polyline, callback){
    Papa.parse(url, {
        download: true,
        complete: function(results){
            callback(results.data, id, markerPositions, markerArray, polyline);
        }
    });
}

function clearMarkers(markerArray) {
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }
}

$('#route1').change(function() {
    if($('#route1').prop("checked")) {
        parseData("data/15-key-bus-routes/route1/stops.txt", "route1", markerPositions1, markerArray1, polyline1, createMarker);//actualMarker1, content1, infoWindows1, createMarker);
    }
    else{
        clearMarkers(markerArray1);
        markerPositions1 = [];
        markerArray1 = [];
        polyline1.setMap(null);
        //actualMarker1 = [];
        //content1 = [];
        //infoWindows1 = [];
    }
});

$('#route15').change(function() {
    if($('#route15').prop("checked")) {
        parseData("data/15-key-bus-routes/route15/stops.txt", "route15", markerPositions15, markerArray15, polyline15, createMarker);//actualMarker15, content15, infoWindows15, createMarker);
    }
    else{
        clearMarkers(markerArray15);
        markerPositions15 = [];
        markerArray15 = [];
        polyline15.setMap(null);
        //actualMarker15 = [];
        //content15 = [];
        //infoWindows15 = [];
    }
});

$('#route22').change(function() {
    if($('#route22').prop("checked")) {
       parseData("data/15-key-bus-routes/route22/stops.txt", "route22", markerPositions22, markerArray22, polyline22, createMarker);
    }
    else{
        clearMarkers(markerArray22);
        markerPositions22 = [];
        markerArray22 = [];
        polyline22.setMap(null);
    }
});

$('#route23').change(function() {
    if($('#route23').prop("checked")) {
        parseData("data/15-key-bus-routes/route23/stops.txt", "route23", markerPositions23, markerArray23, polyline23, createMarker);
    }
    else{
        clearMarkers(markerArray23);
        markerPositions23 = [];
        markerArray23 = [];
        polyline23.setMap(null);
    }
});

$('#route28').change(function() {
    if($('#route28').prop("checked")) {
        parseData("data/15-key-bus-routes/route28/stops.txt", "route28", markerPositions28, markerArray28, polyline28, createMarker);
    }
    else{
        clearMarkers(markerArray28);
        markerPositions28 = [];
        markerArray28 = [];
        polyline28.setMap(null);
    }
});

$('#route32').change(function() {
    if($('#route32').prop("checked")) {
        parseData("data/15-key-bus-routes/route32/stops.txt", "route32", markerPositions32, markerArray32, polyline32, createMarker);
    }
    else{
        clearMarkers(markerArray32);
        markerPositions32 = [];
        markerArray32 = [];
        polyline32.setMap(null);
    }
});

$('#route39').change(function() {
    if($('#route39').prop("checked")) {
        parseData("data/15-key-bus-routes/route39/stops.txt", "route39", markerPositions39, markerArray39, polyline39, createMarker);
    }
    else{
        clearMarkers(markerArray39);
        markerPositions39 = [];
        markerArray39 = [];
        polyline39.setMap(null);
    }
});

$('#route57').change(function() {
    if($('#route57').prop("checked")) {
        parseData("data/15-key-bus-routes/route57/stops.txt", "route57", markerPositions57, markerArray57, polyline57, createMarker);
    }
    else{
        clearMarkers(markerArray57);
        markerPositions57 = [];
        markerArray57 = [];
        polyline57.setMap(null);
    }
});

$('#route66').change(function() {
    if($('#route66').prop("checked")) {
        parseData("data/15-key-bus-routes/route66/stops.txt", "route66", markerPositions66, markerArray66, polyline66, createMarker);
    }
    else{
        clearMarkers(markerArray66);
        markerPositions66 = [];
        markerArray66 = [];
        polyline66.setMap(null);
    }
});

$('#route71').change(function() {
    if($('#route71').prop("checked")) {
        parseData("data/15-key-bus-routes/route71/stops.txt", "route71", markerPositions71, markerArray71, polyline71, createMarker);
    }
    else{
        clearMarkers(markerArray71);
        markerPositions71 = [];
        markerArray71 = [];
        polyline71.setMap(null);
    }
});

$('#route73').change(function() {
    if($('#route73').prop("checked")) {
        parseData("data/15-key-bus-routes/route73/stops.txt", "route73", markerPositions73, markerArray73, polyline73, createMarker);
    }
    else{
        clearMarkers(markerArray73);
        markerPositions73 = [];
        markerArray73 = [];
        polyline73.setMap(null);
    }
});

$('#route77').change(function() {
    if($('#route77').prop("checked")) {
        parseData("data/15-key-bus-routes/route77/stops.txt", "route77", markerPositions77, markerArray77, polyline77, createMarker);
    }
    else{
        clearMarkers(markerArray77);
        markerPositions77 = [];
        markerArray77 = [];
        polyline77.setMap(null);
    }
});

$('#route111').change(function() {
    if($('#route111').prop("checked")) {
        parseData("data/15-key-bus-routes/route111/stops.txt", "route111", markerPositions111, markerArray111, polyline111, createMarker);
    }
    else{
        clearMarkers(markerArray111);
        markerPositions111 = [];
        markerArray111 = [];
        polyline111.setMap(null);
    }
});

$('#route116').change(function() {
    if($('#route116').prop("checked")) {
        parseData("data/15-key-bus-routes/route116/stops.txt", "route116", markerPositions116, markerArray116, polyline116, createMarker);
    }
    else{
        clearMarkers(markerArray116);
        markerPositions116 = [];
        markerArray116 = [];
        polyline116.setMap(null);
    }
});

$('#route117').change(function() {
    if($('#route117').prop("checked")) {
        parseData("data/15-key-bus-routes/route117/stops.txt", "route117", markerPositions117, markerArray117, polyline117, createMarker);
    }
    else{
        clearMarkers(markerArray117);
        markerPositions117 = [];
        markerArray117 = [];
        polyline117.setMap(null);
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
