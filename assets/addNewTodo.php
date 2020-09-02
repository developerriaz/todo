<?php

require 'constants.php';

$response = array();

if(isset($_GET['todo'])){
    $todo = $_GET['todo'];

    $connect = mysqli_connect(Constants::$host,Constants::$user,Constants::$password,Constants::$database);
    $sql = "INSERT INTO todo_task(title) VALUES('$todo')";

    if($query = mysqli_query($connect, $sql)){

        $response['id'] = mysqli_insert_id($connect);

    }else{
        $response['error'] = "SQL query contains an error.";
    }

    mysqli_close($connect);

}else{
    $response['error'] = "Missing GET param \'todo\'";
}

echo json_encode($response);

?>