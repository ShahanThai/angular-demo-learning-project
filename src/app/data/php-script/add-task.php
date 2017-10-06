<?php
/**
 * Created by PhpStorm.
 * User: ShahanThai
 * Date: 04/10/2017
 * Time: 18:14
 */
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$employeeListFile = "../employeesList.txt";
$employeeList = json_decode(file_get_contents($employeeListFile), true);

$employeeID = $_POST['employeeID'];
$task = json_decode($_POST['task']);


foreach($employeeList as $key => $value)
{
    if ($value["id"] == $employeeID) {
//        var_dump($key);
        $employeeIndex = $key;
//        $task->id = count($value["tasks"]) + 1;
//        array_push($employeeList[$key]["tasks"], $task);
        break;
    }
}

$imgSrcs = json_decode($_POST["imgSrcs"]);
$rootPath = $_SERVER['DOCUMENT_ROOT'];
$task->id = count($employeeList[$employeeIndex]["tasks"]) + 1;
$tmpDir = $rootPath . '/img/tmp-' . $employeeID . '-' . $task->id;

if (!file_exists($tmpDir)) {
    mkdir($tmpDir, 0777, true);
}
$tmpImgs = [];
foreach($imgSrcs as $index => $imgSrc)
{
    switch ($imgSrc->type) {
        case 2:
            $newFileName = 'e' . $employeeID . '-t' . $task->id . '-i' . $index . '.jpg';
            $newPath = $tmpDir . $newFileName;
            copy($imgSrc->src, $newPath);
            array_push($tmpImgs, $newFileName);
            break;
        case 3:
            foreach($_FILES as $i => $file) {
                $fileName = $file['name'];
                $fileTempName = $file['tmp_name'];
                if ($fileName == $imgSrc->name) {
                    $newFileName = 'e' . $employeeID . '-t' . $task->id . '-i' . $index . '.jpg';
                    $newPath = $tmpDir . $newFileName;
                    copy($fileTempName, $newPath);
                    array_push($tmpImgs, $newFileName);
                    break;
                }
            }
            break;
    }
}

rmdir($tmpDir);
$newImgURLS = [];
foreach($tmpImgs as $index => $imgName) {
    $oldPath = $tmpDir . $imgName;
    $newPath = $rootPath . '/img/' . $imgName;
    array_push($newImgURLS, 'img/' . $imgName);
    copy($oldPath, $newPath);
    unlink($oldPath);
}
$task->imgUrls = $newImgURLS;
array_push($employeeList[$employeeIndex]["tasks"], $task);

$fp = fopen($employeeListFile, 'w');
fwrite($fp, json_encode($employeeList));
fclose($fp);
$result = [
    "error_code" => 0,
    "data" => []
];
echo json_encode(
    $result
);