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

        //echo json_encode($response);
        break;

    case 'view':

        // echo json_encode($response);
        break;

    case 'edit':
        if ($class == 'Cliente') {

            try {

                $fornecedor = $cliente_bo->all()->find($_POST['id'])->first()->exec();
                $fornecedor->recurso_pago = $_POST['recurso_pago'];

                $cliente_bo->save($fornecedor);

                $response['object'] = 1;
                $response['row']    = 1;
            } catch (Exception $e) {
                echo $e;
            }
        }
        echo json_encode($response);
        break;

    case 'list':
        if ($class == 'Fornecedor') {

            try {

                $fornecedores = $cliente_bo->all()->where('fornecedor = 1')->exec();

                if ($fornecedores != null) {
                    $response['object'] = $fornecedores;
                    $response['row']    = count($response['object']);
                }
            } catch (Exception $e) {
                echo $e;
            }
        } else if ($class == 'Produto') {

            try {

                $produtos = $cliente_bo->select('produto.codigo, produto.descricao, produto.preco, produto.situacao')->join('fornecedor_produto', 'id', 'cliente_id')->joinwopktable('fornecedor_produto', 'produto', 'produto_id', 'id')->where('cliente.id = ' . $_POST['id'])->execwoclass();

                if ($produtos != null) {
                    $response['object'] = $produtos;
                    $response['row']    = count($response['object']);
                }
            } catch (Exception $e) {
                echo $e;
            }
        }
        echo json_encode($response);
        break;
}
