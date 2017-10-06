<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$file = "../employeesList.txt";
$json = json_decode(file_get_contents($file), true);

$data = json_decode(file_get_contents('php://input'), true);
//print_r($data);
$data["id"] = count($json) + 1;
array_push($json, $data);

$id = $data["id"];
//print_r($json) ;
$fp = fopen($file, 'w');
fwrite($fp, json_encode($json));
fclose($fp);
$result = [
    "error_code" => 0,
    "data" => $id
];
echo json_encode(
    $result
);

