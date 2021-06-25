<?php

include_once '../Connections.php';

include_once '../Model.php';

include_once '../to/cliente/Cliente.php';
include_once '../dao/cliente/ClienteDao.php';
include_once '../bo/cliente/ClienteBo.php';

$connections = new Connections();

$op = $_GET['op'];
$class = $_GET['class'];

$con = $connections->makeConnection('mesalva', 'root', 'root');

$cliente_bo             = new ClienteBo($con);

$response['object']     = null;
$response['row']        = 0;

switch ($op) {

    case 'add':
        if ($class == 'Cliente') {

            try {

                $cliente = $cliente_bo->setCreateColumns(null, $_POST);

                $verify = $cliente_bo->save($cliente);

                if ($verify != false) {
                    $response['object'] = 1;
                } else {
                    $response['object'] = 2;
                }

                $response['row']    = 1;
            } catch (Exception $e) {
                echo $e;
            }
        }
        echo json_encode($response);
        break;

    case 'view':

        if ($class == 'Cliente') {

            try {

                $cliente = $cliente_bo->select('cliente.*, banco.nome AS banco')->join('banco', 'banco_id', 'id')->where('cliente.id = ' . $_POST['id'])->first()->execwoclass();

                if ($cliente != null) {
                    $response['object'] = $cliente;
                    $response['row']    = 1;
                }
            } catch (Exception $e) {
                echo $e;
            }
        }
        echo json_encode($response);
        break;

    case 'edit':
        if ($class == 'Cliente') {

            try {

                $cliente = $cliente_bo->setUpdateColumns($_POST['id'], $_POST);

                $verify = $cliente_bo->save($cliente);

                if ($verify != false) {
                    $response['object'] = 1;
                } else {
                    $response['object'] = 2;
                }

                $response['row']    = 1;
            } catch (Exception $e) {
                echo $e;
            }
        }
        echo json_encode($response);
        break;

    case 'list':
        if ($class == 'Cliente') {

            try {

                $clientes = $cliente_bo->all()->order('nome ASC')->exec();

                if ($clientes != null) {
                    $response['object'] = $clientes;
                    $response['row']    = count($response['object']);
                }
            } catch (Exception $e) {
                echo $e;
            }
        }
        echo json_encode($response);
        break;

    case 'delete':
        if ($class == 'Cliente') {

            try {

                $cliente = $cliente_bo->all()->find($_POST['id'])->first()->exec();

                if ($cliente != null) {

                    $cliente_bo->delete($cliente)->exec();
                    $response['object'] = 1;
                    $response['row']    = 1;
                }
            } catch (Exception $e) {
                echo $e;
            }
        }
        echo json_encode($response);
        break;
}
