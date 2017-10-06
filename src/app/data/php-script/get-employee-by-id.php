<?php
/**
 * Created by PhpStorm.
 * User: ShahanThai
 * Date: 04/10/2017
 * Time: 20:25
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$file = "../employeesList.txt";
$employeeList = json_decode(file_get_contents($file), true);
$id = $_GET['id'];
$employee = [];
//print_r($employeeList);
$index = -1;
foreach($employeeList as $key => $value)
{
    if ($value['id'] == $id) {
//        print_r($value);
        $index = $key;
        break;
    }
}
if ($index == -1) {
    $error_code = 1;
} else {
    $error_code = 0;
    $employee = $employeeList[$key];
}

$result = [
    "error_code" => $error_code,
    "result" => $employee
];
echo json_encode(
    $result
);