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


//print_r($_POST);
//print_r($_FILES);
$employeeID = $_POST['employeeID'];
$task = json_decode($_POST['task']);
$imgSrcs = json_decode($_POST["imgSrcs"]);
//var_dump($task);
//var_dump($imgSrcs);
//print_r($data);

$rootPath = $_SERVER['DOCUMENT_ROOT'];
$tmpDir = $rootPath . '/img/tmp-' . $employeeID . '-' . $task->id;
if (!file_exists($tmpDir)) {
    mkdir($tmpDir, 0777, true);
}

$tmpImgs = [];
foreach($imgSrcs as $index => $imgSrc)
{
    $rand = md5(uniqid(rand(), true));
    switch ($imgSrc->type) {
        case 1:
        case 2:
//            var_dump($imgSrc->src);
//            var_dump($rootPath);

            $newFileName = 'e' . $employeeID . '-t' . $task->id . '-i' . $index . '-' . $rand . '.jpg';
            $newPath = $tmpDir . $newFileName;
            copy($imgSrc->src, $newPath);
            array_push($tmpImgs, $newFileName);
            break;
        case 3:
//            print_r($imgSrc);
            foreach($_FILES as $i => $file) {
                // for easy access
                $fileName = $file['name'];
                // for easy access
                $fileTempName = $file['tmp_name'];
//                var_dump($fileName);
//                var_dump($fileTempName);
//                var_dump($fileName === $imgSrc->name);
                if ($fileName == $imgSrc->name) {
//                    print_r($imgSrc->name);
                    $newFileName = 'e' . $employeeID . '-t' . $task->id . '-i' . $index . '-' . $rand . '.jpg';
//                    var_dump('dsad');
//                    var_dump($newFileName);
                    $newPath = $tmpDir . $newFileName;
                    copy($fileTempName, $newPath);
                    array_push($tmpImgs, $newFileName);
                    break;
                }
            }
            break;
    }
}

foreach($task->imgUrls as $index => $url) {
    $path = $rootPath . '/' . $url;
//    var_dump($path);
    unlink($path);
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


//print_r($data);
foreach($employeeList as $key => $value)
{
    $employee = $value;
    if ($value["id"] == $employeeID) {
//        var_dump($key);
        foreach($value["tasks"] as $keyTask => $valueTask)
        {
            if ($value["tasks"][$keyTask]["id"] == $task->id) {
                $employeeList[$key]["tasks"][$keyTask] = $task;
//                print_r($employeeList[$key]);
                break;
            }
//            print_r($employeeList);
        }
        break;
    }
}
//var_dump(json_encode($employeeList));
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