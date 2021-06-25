<?php

include_once '../Connections.php';

include_once '../Model.php';

include_once '../to/banco/Banco.php';
include_once '../dao/banco/BancoDao.php';
include_once '../bo/banco/BancoBo.php';

$connections = new Connections();

$op = $_GET['op'];
$class = $_GET['class'];

$con = $connections->makeConnection('mesalva', 'root', 'root');

$banco_bo             = new BancoBo($con);

$response['object']     = null;
$response['row']        = 0;

switch ($op) {

    case 'add':

        //echo json_encode($response);
        break;

    case 'view':

        // echo json_encode($response);
        break;

    case 'edit':

        //echo json_encode($response);
        break;

    case 'list':
        if ($class == 'Banco') {

            try {

                $bancos = $banco_bo->all()->exec();

                if ($bancos != null) {
                    $response['object'] = $bancos;
                    $response['row']    = count($response['object']);
                }
            } catch (Exception $e) {
                echo $e;
            }
        }
        echo json_encode($response);
        break;
}
