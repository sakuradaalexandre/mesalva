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
        } else if ($class == 'Misc') {
            try {

                $bancos = $cliente_bo->custom('SELECT * FROM banco')->execwoclass();

                $ultimo_cliente = $cliente_bo->all()->order('id DESC')->first()->exec();
                $ultimo_fornecedor = $cliente_bo->all()->where('fornecedor = 1')->order('id DESC')->first()->exec();

                $tamanho_cliente = strlen($ultimo_cliente->codigo);
                $tamanho_fornecedor = strlen($ultimo_fornecedor->fornecedor_cod);
                $ultimo_digito_cliente = substr($ultimo_cliente->codigo, $tamanho_cliente - 1, $tamanho_cliente);
                $ultimo_digito_fornecedor = substr($ultimo_fornecedor->fornecedor_cod, $tamanho_fornecedor - 1, $tamanho_fornecedor);
                $sujestao_incompleta_cliente = substr($ultimo_cliente->codigo, 0, $tamanho_cliente - 1);
                $sujestao_incompleta_fornecedor = substr($ultimo_fornecedor->fornecedor_cod, 0, $tamanho_fornecedor - 1);
                if ($ultimo_digito_cliente >= '0' && $ultimo_digito_cliente <= '9') {
                    $digito_cliente = (int) $ultimo_digito_cliente + 1;
                } else {
                    $digito_cliente = 1;
                }
                if ($ultimo_digito_fornecedor >= '0' && $ultimo_digito_fornecedor <= '9') {
                    $digito_fornecedor = (int) $ultimo_digito_fornecedor + 1;
                } else {
                    $digito_fornecedor = 1;
                }

                $sujestao_codigo_cliente = $sujestao_incompleta_cliente . $digito_cliente;
                $sujestao_codigo_fornecedor = $sujestao_incompleta_fornecedor . $digito_fornecedor;

                if ($bancos != null) {
                    $response['sujestao_codigo_cliente'] = $sujestao_codigo_cliente;
                    $response['sujestao_codigo_fornecedor'] = $sujestao_codigo_fornecedor;
                    $response['object'] = $bancos;
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
