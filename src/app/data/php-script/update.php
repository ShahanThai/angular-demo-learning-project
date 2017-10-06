<?php
/**
 * Created by PhpStorm.
 * User: ShahanThai
 * Date: 03/10/2017
 * Time: 20:52
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$file = "../employeesList.txt";
$employeeList = json_decode(file_get_contents($file), true);

$data = json_decode(file_get_contents('php://input'), true);

foreach($employeeList as $key => $value)
{
    if ($value["id"] == $data["id"]) {
        $employeeList[$key] = $data;
        break;
    }
}

$fp = fopen($file, 'w');
fwrite($fp, json_encode($employeeList));
fclose($fp);
$result = [
    "error_code" => 0,
    "data" => []
];
echo json_encode(
    $result
);