<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    //header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');    
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
}   
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
} 

// Check for empty fields
if(empty($_POST['busRoute'])  		||
   empty($_POST['inOut']) 			||
   empty($_POST['year'])			||
   empty($_POST['month'])			||
   empty($_POST['metric']))
   {
	echo "No arguments Provided!";
	return false;
   }

$busRoute = $_POST['busRoute'];
$inOut = $_POST['inOut'];
$year = $_POST['year'];
$month = $_POST['month'];
$metric = $_POST['metric'];

return true;
?>