<?php
// Check for empty fields
if(empty($_POST['busRoute'])  		||
   empty($_POST['inOut']) 	||
   empty($_POST['year'])			||
   empty($_POST['month'])			||
   empty($_POST['metric'])
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