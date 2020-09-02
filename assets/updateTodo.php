<?php

require 'constants.php';

$response = array();

if(isset($_GET['todoID'], $_GET['newTitle'],$_GET['newDetail'], $_GET['newStatus'])){

    $id = $_GET['todoID'];
    $newTitle = $_GET['newTitle'];
    $newDetail = $_GET['newDetail'];
    $newStatus = $_GET['newStatus'];

    $connect = mysqli_connect(Constants::$host,Constants::$user,Constants::$password,Constants::$database);

    $sql = 
    "UPDATE todo_task
    SET todo_task.title = '$newTitle', todo_task.details = '$newDetail', todo_task.status = $newStatus 
    WHERE todo_task.todoID = $id";

    if($query = mysqli_query($connect, $sql)){

        $response['update'] = (mysqli_affected_rows($connect) > 0);

    }else{
        $response['error'] = "SQL Error. QUery contains an error. since " . mysqli_error($connect);
    }

    mysqli_close($connect);

}else{
    $response['error'] = "Missing GET param \'todoID\'";
}

echo json_encode($response);

?>