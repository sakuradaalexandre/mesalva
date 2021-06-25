<?php

include_once '../Connections.php';

include_once '../Model.php';

include_once '../to/venda/Venda.php';
include_once '../dao/venda/VendaDao.php';
include_once '../bo/venda/VendaBo.php';

include_once '../to/produto/Produto.php';
include_once '../dao/produto/ProdutoDao.php';
include_once '../bo/produto/ProdutoBo.php';

$connections = new Connections();

$op = $_GET['op'];
$class = $_GET['class'];

$con = $connections->makeConnection('mesalva', 'root', 'root');

$venda_bo             = new VendaBo($con);
$produto_bo             = new ProdutoBo($con);

$response['object']     = null;
$response['row']        = 0;

switch ($op) {

    case 'add':
        if ($class == 'Venda') {

            try {

                $venda = $venda_bo->setCreateColumns(null, $_POST);

                $venda_bo->save($venda);

                $produto = $produto_bo->all()->find($venda->produto_id)->first()->exec();

                $produto->situacao = 2;

                $produto_bo->save($produto);

                $response['object'] = 1;
                $response['row']    = 1;
            } catch (Exception $e) {
                echo $e;
            }
        }
        echo json_encode($response);
        break;

    case 'view':
        if ($class == 'Venda') {
            try {

                $venda = $venda_bo->select('cliente.nome AS cliente, produto.codigo AS produto, produto.descricao AS descricao, pagamento.nome AS pagamento, venda.*, cliente.id AS cliente_id, produto.id AS produto_id, pagamento.id AS pagamento_id')->join('cliente', 'cliente_id', 'id')->join('produto', 'produto_id', 'id')->join('pagamento', 'pagamento_id', 'id')->where('venda.id = ' . $_POST['id'])->first()->execwoclass();

                if ($venda != null) {
                    $response['object'] = $venda;
                    $response['row']    = 1;
                }
            } catch (Exception $e) {
                echo $e;
            }
        } else if ($class = 'Valor') {
            try {

                $valor = $produto_bo->select('preco')->find($_POST['id'])->first()->exec();

                if ($valor != null) {
                    $response['object'] = $valor;
                    $response['row']    = 1;
                }
            } catch (Exception $e) {
                echo $e;
            }
        }
        echo json_encode($response);
        break;

    case 'edit':
        if ($class == 'Venda') {

            try {

                $venda = $venda_bo->setUpdateColumns($_POST['id'], $_POST);

                $venda_old = $venda_bo->all()->find($_POST['id'])->first()->exec();

                $produto_dif = false;

                if ($venda_old->produto_id != $_POST['produto_id']) {
                    $produto_dif = true;
                }

                if ($produto_dif == true) {

                    $produto1 = $produto_bo->all()->find($venda_old->produto_id)->first()->exec();

                    $produto1->situacao = 1;

                    $produto_bo->save($produto1);

                    $produto2 = $produto_bo->all()->find($venda->produto_id)->first()->exec();

                    $produto2->situacao = 2;

                    $produto_bo->save($produto2);

                }

                $venda_bo->save($venda);

                $response['object'] = 1;
                $response['row']    = 1;
            } catch (Exception $e) {
                echo $e;
            }
        }
        echo json_encode($response);
        break;

    case 'list':
        if ($class == 'Venda') {

            try {

                $vendas = $venda_bo->select('cliente.nome AS cliente, produto.codigo AS codigo, produto.descricao AS produto, venda.*')->join('cliente', 'cliente_id', 'id')->join('produto', 'produto_id', 'id')->execwoclass();

                if ($vendas != null) {
                    $response['object'] = $vendas;
                    $response['row']    = count($response['object']);
                }
            } catch (Exception $e) {
                echo $e;
            }
        } else if ($class == 'Misc') {

            $sql_prod = 'SELECT * FROM produto WHERE situacao = 1';

            if (isset($_POST['id'])) {

                $venda = $venda_bo->select('produto_id')->find($_POST['id'])->first()->exec();

                $sql_prod .= ' OR id = '.$venda->produto_id;

            }

            try {

                $clientes = $venda_bo->custom('SELECT * FROM cliente')->execwoclass();
                $produtos = $venda_bo->custom($sql_prod)->execwoclass();
                $pagamentos = $venda_bo->custom('SELECT * FROM pagamento')->execwoclass();

                if ($clientes != null) {
                    $response['object']['cliente'] = $clientes;
                    $response['object']['produto'] = $produtos;
                    $response['object']['pagamento'] = $pagamentos;
                    $response['row']    = count($response['object']);
                }
            } catch (Exception $e) {
                echo $e;
            }
        }
        echo json_encode($response);
        break;

        case 'delete':
            if ($class == 'Venda') {
    
                try {
    
                    $venda = $venda_bo->all()->find($_POST['id'])->first()->exec();
    
                    if ($venda != null) {
    
                        $venda_bo->delete($venda)->exec();
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
