<?php

    $id = $_POST['id'];

    include 'database.php';

    $query = "DELETE FROM productos WHERE id = $id";

    $result = mysqli_query($connection, $query);

    if(!$result) {
        die('Error en la consulta');
    }

    echo 'El producto fue eliminado correctamente';

?>