<?php

require 'constants.php';

$response = array();

$connect = mysqli_connect(Constants::$host,Constants::$user,Constants::$password,Constants::$database);

$sql = "SELECT * FROM todo_task ORDER BY todoID DESC";

if($query = mysqli_query($connect, $sql)){

    $list = array();
    while($row = mysqli_fetch_assoc($query)){
        $list[] = $row;
    }
    $response['list'] = $list;

    mysqli_close($connect);

}else{
    $response['error'] = "SQL Execution Error. The query contains an error!";
}

echo json_encode($response);

?>