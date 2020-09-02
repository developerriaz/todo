<?php

require './constants.php';

$response = array();
if(isset($_GET['todoID'])){
    
    $todoID = $_GET['todoID'];
    $connect = mysqli_connect(Constants::$host,Constants::$user,Constants::$password,Constants::$database);

    $sql = "DELETE FROM todo_task WHERE todoID = $todoID ";

    if($query = mysqli_query($connect,$sql)){
        
    }
    else{
        $response['error'] = "SQL failed to execute.";
    }

    mysqli_close($connect);

}else{
    $response['error'] = "Missing GET param \'todoID\'";
}

echo json_encode($response);

?>