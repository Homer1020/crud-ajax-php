<?php

    include 'database.php';

    $nombre = $_POST['nombre'];
    $precio = $_POST['precio'];
    
    $query = "INSERT INTO productos(nombre, precio) VALUES('$nombre', '$precio')";

    $result = mysqli_query($connection, $query);

    if(!$result) {
        die('Error en la consulta');
    }

    echo 'Se inserto correctamente';

?>