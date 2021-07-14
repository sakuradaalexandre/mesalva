<?php

include_once '../Connections.php';

include_once '../Model.php';

include_once '../to/produto/Produto.php';
include_once '../dao/produto/ProdutoDao.php';
include_once '../bo/produto/ProdutoBo.php';

include_once '../to/cliente/Cliente.php';
include_once '../dao/cliente/ClienteDao.php';
include_once '../bo/cliente/ClienteBo.php';

include_once '../to/venda/Venda.php';
include_once '../dao/venda/VendaDao.php';
include_once '../bo/venda/VendaBo.php';

$connections = new Connections();

$op = $_GET['op'];
$class = $_GET['class'];

$con = $connections->makeConnection('mesalva', 'root', 'root');

$produto_bo = new ProdutoBo($con);
$cliente_bo = new ClienteBo($con);
$venda_bo = new VendaBo($con);

$response['object']     = null;
$response['row']        = 0;

switch ($op) {

    case 'add':
        
        // echo json_encode($response);
        break;

    case 'view':
        
        //echo json_encode($response);
        break;

    case 'edit':
        
        //echo json_encode($response);
        break;

    case 'list':
        if ($class == 'All') {

            try {

                $banco = $cliente_bo->custom('SELECT * FROM banco')->execwoclass();
                $cliente = $cliente_bo->all()->exec();
                $fornecedor_produto = $cliente_bo->select('fornecedor_produto.*')->join('fornecedor_produto', 'id', 'cliente_id')->execwoclass();
                $pagamento = $cliente_bo->custom('SELECT * FROM pagamento')->execwoclass();
                $produto = $produto_bo->all()->exec();
                $produto_venda = $produto_bo->select('produto_venda.*')->join('produto_venda', 'id', 'produto_id')->execwoclass();
                $venda = $venda_bo->all()->exec();

                $response['object']['banco'] = $banco;
                $response['object']['cliente'] = $cliente;
                $response['object']['fornecedor_produto'] = $fornecedor_produto;
                $response['object']['pagamento'] = $pagamento;
                $response['object']['produto'] = $produto;
                $response['object']['produto_venda'] = $produto_venda;
                $response['object']['venda'] = $venda;
                $response['row']    = count($response['object']);
            } catch (Exception $e) {
                echo $e;
            }
        } 
        echo json_encode($response);
        break;
}
