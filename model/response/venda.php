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

            $request['venda'] = $_POST['venda'];
            $request['produtos'] = $_POST['produtos'];

            try {

                $venda = $venda_bo->setCreateColumns(null, $_POST['venda']);

                $venda_bo->save($venda);

                $venda_id = $venda_bo->getLastInsertedId();

                foreach ($request['produtos'] as $produto_id) {
                    $produto = $produto_bo->all()->find($produto_id)->first()->exec();
                    $produto->situacao = 2;
                    $produto_bo->save($produto);
                    $venda_bo->createiatable('produto_venda', ['produto_id', 'venda_id'])->execwoclass([':produto_id' => $produto_id, ':venda_id' => $venda_id]);
                }

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

                $venda = $venda_bo->select('cliente.nome AS cliente, pagamento.nome AS pagamento, venda.*, cliente.id AS cliente_id, pagamento.id AS pagamento_id')->join('cliente', 'cliente_id', 'id')->join('pagamento', 'pagamento_id', 'id')->where('venda.id = ' . $_POST['id'])->first()->execwoclass();


                if ($venda != null) {

                    $produto_venda = $venda_bo->all()->join('produto_venda', 'id', 'venda_id')->where('venda.id = ' . $venda->id)->execwoclass();

                    foreach ($produto_venda as $pv) {
                        $produtos[] = $produto_bo->all()->find($pv->produto_id)->first()->exec();
                    }

                    $response['object']['produto'] = $produtos;
                    $response['object']['venda'] = $venda;
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

                $vendas = $venda_bo->select('cliente.nome AS cliente, venda.*')->join('cliente', 'cliente_id', 'id')->execwoclass();

                if ($vendas != null) {

                    foreach ($vendas as $v) {
                        
                        $produto_venda[$v->id] = $venda_bo->all()->join('produto_venda', 'id', 'venda_id')->joinwopktable('produto_venda', 'produto', 'produto_id', 'id')->where('venda.id = ' . $v->id)->execwoclass();

                    }

                    $response['object']['produto'] = $produto_venda;
                    $response['object']['venda'] = $vendas;
                    $response['row']    = count($response['object']['venda']);
                }
            } catch (Exception $e) {
                echo $e;
            }
        } else if ($class == 'Misc') {

            $sql_prod = 'SELECT * FROM produto WHERE situacao = 1';

            if (isset($_POST['id'])) {

                $venda = $venda_bo->select('produto_id')->find($_POST['id'])->first()->exec();

                $sql_prod .= ' OR id = ' . $venda->produto_id;
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
        } else if ($class == 'Produto') {

            try {

                if (!isset($_POST['id0'])) {
                    $produtos = $produto_bo->all()->where('situacao = 1')->exec();
                } else {
                    $sql = '';
                    foreach ($_POST as $request) {
                        $sql .= ' AND id != ' . $request;
                    }

                    $produtos = $produto_bo->all()->where('situacao = 1' . $sql)->exec();
                }

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

    case 'delete':
        if ($class == 'Venda') {

            try {

                $venda = $venda_bo->all()->find($_POST['id'])->first()->exec();
                $venda_id = $venda->id;

                if ($venda != null) {

                    $produto_venda = $venda_bo->all()->join('produto_venda', 'id', 'venda_id')->where('venda.id = ' . $venda_id)->execwoclass();

                    foreach ($produto_venda as $pv) {

                        $produto = $produto_bo->all()->find($pv->produto_id)->first()->exec();
                        $produto->situacao = 1;
                        $produto_bo->save($produto);
                    }

                    $venda_bo->custom('DELETE FROM produto_venda WHERE venda_id = ' . $venda_id)->execwoclass();

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
