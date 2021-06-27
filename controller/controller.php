<?php

switch ($page) {

    case 'venda':
        include_once './view/venda.php';
        break;

    case 'fornecedor':
        include_once './view/fornecedor.php';
        break;

    case 'cliente':
        include_once './view/cliente.php';
        break;

    case 'produto':
        include_once './view/produto.php';
        break;

    case 'info':
        include_once './view/info.php';
        break;

    case 'relatorio':
        include_once './view/relatorio.php';
        break;

    case 'add_edit_venda':
        include_once './view/add_edit_venda.php';
        break;

    default:
        echo 'alguma coisa n foi';
        break;
}
