<?php

    $nombre = $_POST['nombre'];
    $precio = $_POST['precio'];
    $id = $_POST['id'];

    include 'database.php';

    $query = "UPDATE productos SET nombre='$nombre', precio='$precio' WHERE id = $id";

    $result = mysqli_query($connection, $query);

    if(!$result) {
        die('Error en la consulta' . mysqli_error($connection));
    }

    echo 'Producto actualizado';

?>