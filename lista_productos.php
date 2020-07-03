<?php

    include 'database.php';

    $query = "SELECT * FROM productos";

    $result = mysqli_query($connection, $query);

    if(!$result) {
        die('Consulta fallida');
    }

    $json = array();
    while($row = mysqli_fetch_array($result)) {
        $json[] = array(
            'nombre' => $row['nombre'],
            'precio' => $row['precio'],
            'id' => $row['id']
        );
    }

    $jsonstring = json_encode($json);

    echo $jsonstring;

?>