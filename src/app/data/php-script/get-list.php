<?php
/**
 * Created by PhpStorm.
 * User: ShahanThai
 * Date: 04/10/2017
 * Time: 19:58
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$file = "../employeesList.txt";
$employeeList = [];
if (!file_exists($file)) {
    $fp = fopen($file, 'w');
    fwrite($fp, json_encode($employeeList));
    fclose($fp);
} else {
    $employeeList = json_decode(file_get_contents($file), true);
}


$result = [
    "error_code" => 0,
    "result" => $employeeList
];
echo json_encode(
    $result
);
