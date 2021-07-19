<?php

include_once '../Connections.php';

include_once '../Model.php';

include_once '../to/produto/Produto.php';
include_once '../dao/produto/ProdutoDao.php';
include_once '../bo/produto/ProdutoBo.php';

include_once '../to/cliente/Cliente.php';
include_once '../dao/cliente/ClienteDao.php';
include_once '../bo/cliente/ClienteBo.php';

$connections = new Connections();

$op = $_GET['op'];
$class = $_GET['class'];

$con = $connections->makeConnection('mesalva', 'root', 'root');

$produto_bo = new ProdutoBo($con);
$cliente_bo = new ClienteBo($con);

$response['object']     = null;
$response['row']        = 0;

function getNextId($string, $posicao, $number = '') {

    if ($string[$posicao] >= '0' && $string[$posicao] <= '9') {
        $vava = getNextId($string, $posicao - 1, $number);
        $number .= $string[$posicao];
        return $vava.$string[$posicao];
    } else {
        return null;
    }

}

switch ($op) {

    case 'add':
        if ($class == 'Produto') {

            try {

                $request = $_POST;
                $request['img'] = isset($_FILES['img']) ? $_FILES['img']['name'] : null;

                $produto = $produto_bo->setCreateColumns(null, $request);

                $verify = $produto_bo->save($produto);

                if ($verify != false) {
                    $produto_id = $produto_bo->getLastInsertedId();

                    $produto_bo->createiatable('fornecedor_produto', ['cliente_id', 'produto_id'])->execwoclass([':cliente_id' => (int) $_POST['fornecedor_id'], ':produto_id' => $produto_id]);

                    $cliente = $cliente_bo->all()->find($_POST['fornecedor_id'])->first()->exec();

                    $cliente->data_de_modificacao = date("Y-m-d H:i:s");

                    $cliente_bo->save($cliente);

                    if ($request['img'] != null) {
                        $uploaddir = '../../img/upload/' . $produto_id . '/';

                        if (!file_exists($uploaddir)) {
                            mkdir($uploaddir, 0777, true);
                        }

                        $uploadfile = $uploaddir . basename($_FILES['img']['name']);

                        move_uploaded_file($_FILES['img']['tmp_name'], $uploadfile);
                    }

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
        if ($class == 'Produto') {

            try {

                $produto = $produto_bo->select('produto.*, cliente.nome AS fornecedor, cliente.id AS fornecedor_id')->join('fornecedor_produto', 'id', 'produto_id')->joinwopktable('fornecedor_produto', 'cliente', 'cliente_id', 'id')->where('produto.id = ' . $_POST['id'])->first()->execwoclass();

                if ($produto != null) {
                    $response['object'] = $produto;
                    $response['row']    = 1;
                }
            } catch (Exception $e) {
                echo $e;
            }
        }
        echo json_encode($response);
        break;

    case 'edit':
        if ($class == 'Produto') {

            try {

                $request = $_POST;
                $request['img'] = isset($_FILES['img']) ? $_FILES['img']['name'] : null;

                $fornecedor_produto = $produto_bo->select('fornecedor_produto.cliente_id')->join('fornecedor_produto', 'id', 'produto_id')->where('produto.id = ' . $request['id'])->first()->execwoclass();

                if ($fornecedor_produto->cliente_id == $_POST['fornecedor_id']) {
                    $mesmo_fornecedor = true;
                } else {
                    $mesmo_fornecedor = false;
                }

                $produto = $produto_bo->setUpdateColumns($_POST['id'], $request);

                $verify = $produto_bo->save($produto);

                if ($verify != false) {
                    if ($mesmo_fornecedor == false) {

                        $produto_bo->custom('DELETE FROM fornecedor_produto WHERE produto_id = ' . $produto->id)->exec();

                        $produto_bo->createiatable('fornecedor_produto', ['cliente_id', 'produto_id'])->execwoclass([':cliente_id' => (int) $request['fornecedor_id'], ':produto_id' => $produto->id]);

                        $cliente = $cliente_bo->all()->find($request['fornecedor_id'])->first()->exec();

                        $cliente->data_de_modificacao = date("Y-m-d H:i:s");

                        $cliente_bo->save($cliente);
                    }

                    if (isset($_FILES['img'])) {
                        $uploaddir = '../../img/upload/' . $produto->id . '/';
                        if (!file_exists($uploaddir)) {
                            mkdir($uploaddir, 0777, true);
                        }

                        $uploadfile = $uploaddir . basename($_FILES['img']['name']);

                        move_uploaded_file($_FILES['img']['tmp_name'], $uploadfile);
                    }

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
        if ($class == 'Produto') {

            try {

                $produtos = $produto_bo->all()->exec();

                if ($produtos != null) {
                    $response['object'] = $produtos;
                    $response['row']    = count($response['object']);
                }
            } catch (Exception $e) {
                echo $e;
            }
        } else if ($class == 'Misc') {

            try {

                $ultimo_produto = $produto_bo->all()->order('id DESC')->first()->exec();
                $fornecedores = $cliente_bo->all()->where('fornecedor = 1')->order('data_de_modificacao DESC')->execwoclass();

                $tamanho = strlen($ultimo_produto->codigo);

                $numero_atual = getNextId($ultimo_produto->codigo, $tamanho - 1, '');

                if ($numero_atual[0] == '0') {
                    $proximo = $numero_atual == null ? 0 : ('0' . ((int)$numero_atual + 1));
                } else {
                    $proximo = $numero_atual == null ? 0 : ((int) $numero_atual + 1);
                }

                $position = strpos($ultimo_produto->codigo, $numero_atual);

                $sujestao_incompleta = substr($ultimo_produto->codigo, 0, $position);

                $sujestao_codigo = $sujestao_incompleta.$proximo;

                if ($fornecedores != null) {
                    $response['object']['codigo'] = $sujestao_codigo;
                    $response['object']['fornecedor'] = $fornecedores;
                    $response['row']    = count($response['object']);
                }
            } catch (Exception $e) {
                echo $e;
            }
        } else if ($class == 'ProdutoByFornecedor') {

            try {

                $fornecedores = $cliente_bo->all()->where('fornecedor = 1')->order('nome ASC')->exec();
                $produtos = $produto_bo->select('produto.id, produto.codigo, produto.descricao, produto.preco, produto.situacao, fornecedor_produto.cliente_id')->join('fornecedor_produto', 'id', 'produto_id')->order('produto_id DESC')->execwoclass();
                $lista_de_produtos = null;
                if ($fornecedores != null) {
                    foreach ($fornecedores as $f) {
                        foreach ($produtos as $p) {
                            if ($p->cliente_id == $f->id) {
                                $lista_de_produtos[$f->id][] = $p;
                            }
                        }
                    }
                }

                if ($lista_de_produtos != null) {
                    $response['object']['fornecedores'] = $fornecedores;
                    $response['object']['produtos'] = $lista_de_produtos;
                    $response['row']    = count($response['object']);
                }
            } catch (Exception $e) {
                echo $e;
            }
        }
        echo json_encode($response);
        break;

    case 'delete':
        if ($class == 'Produto') {

            try {

                $produto = $produto_bo->all()->find($_POST['id'])->first()->exec();

                if ($produto != null) {

                    $produto_bo->delete($produto)->exec();
                    $produto_bo->custom('DELETE FROM fornecedor_produto WHERE produto_id = ' . $_POST['id'])->exec();

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
