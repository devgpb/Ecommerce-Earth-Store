<?php
include_once('PDO.php');


$id = $_SESSION['id_admin'];
$trans = $_POST['id'];

$query = "UPDATE `tickets_ajuda` SET `responsavel` = '$id'  WHERE `id` = '$trans' ";

// echo $query;

$res = normalDbQuery($query);
// print_r(count($res));
if(count($res) == 0 ){
    die(json_encode(['retorno'=>'sucesso']));
}else{
    die(json_encode(['retorno'=>'falha']));
}


?>