<?php
require_once '../model/fpdf.php';

require_once '../model/Connections.php';

include_once '../model/Model.php';

include_once '../model/to/venda/Venda.php';
include_once '../model/dao/venda/VendaDao.php';
include_once '../model/bo/venda/VendaBo.php';

include_once '../model/to/cliente/Cliente.php';
include_once '../model/dao/cliente/ClienteDao.php';
include_once '../model/bo/cliente/ClienteBo.php';

include_once '../model/to/produto/Produto.php';
include_once '../model/dao/produto/ProdutoDao.php';
include_once '../model/bo/produto/ProdutoBo.php';

$connections = new Connections();

$id = $_GET['id'];

$con = $connections->makeConnection('mesalva', 'root', 'root');

$venda_bo = new VendaBo($con);
$cliente_bo = new ClienteBo($con);
$produto_bo = new ProdutoBo($con);

$venda = $venda_bo->all()->find($id)->first()->exec();
$cliente = $cliente_bo->all()->find($venda->cliente_id)->first()->exec();
$produto = $produto_bo->all()->find($venda->produto_id)->first()->exec();

function getMonth($month)
{

    switch ($month) {

        case 1:
            return 'Janeiro';

        case 2:
            return 'Fevereiro';

        case 3:
            return 'Março';

        case 4:
            return 'Abril';

        case 5:
            return 'Maio';

        case 6:
            return 'Junho';

        case 7:
            return 'Julho';

        case 8:
            return 'Agosto';

        case 9:
            return 'Setembro';

        case 10:
            return 'Outubro';

        case 11:
            return 'Novembro';

        case 12:
            return 'Dezembro';
    }
}

function fillFone($fone) {

    $r = array();
    $flag = 0;
    for($i=0, $j=0; $i<strlen($fone); $i++, $j++) {
        if ($i == 0) {
            $r[$j] = '(';
            $j++;
        } else if ($i == 2) {
            $r[$j] = ') ';
            $j++;
        } else if ($i == 4 && $r[$i] == '9') {
            $flag = 1;
        } else if ($i == 6 && $flag == 0) {
            $r[$j] = '-';
            $j++;
        } else if ($i == 7 && $flag == 1) {
            $r[$j] = '-';
            $j++;
        }

        $r[$j] = $fone[$i];
    }
    return implode('', $r);

}

class PDF extends FPDF
{
    // Page header
    function Header()
    {
        // Logo
        //$this->Image('../img/pdf.png', 10, 6, 30);
        // Arial bold 15
        $this->SetFont('Arial', 'B', 15);
        // Move to the right
        $this->Cell(80);
        $this->Ln(20);
    }

    // Page footer
    function Footer()
    {
        // Position at 1.5 cm from bottom
        $this->SetY(-15);
        // Arial italic 8
        $this->SetFont('Arial', 'I', 8);
        // Page number
        //$this->Cell(0, 10, 'Page ' . $this->PageNo() . '/{nb}', 0, 0, 'C');
    }
}

// Instanciation of inherited class
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->SetMargins(25, null, 25);
$pdf->AddPage();
$pdf->Cell(30,10, utf8_decode('RECIBO'),0,0);
$pdf->Cell(30,10, utf8_decode('N° '.$venda->id),0,0);
$pdf->Cell(30,10, utf8_decode('VALOR R$'.$venda->valor),0,0);

$pdf->Ln(20);

$pdf->SetFont('Arial', '', 14);

$pdf->Cell(30,10, utf8_decode('Recebi de '.$cliente->nome),0,0);
$pdf->Ln(10);
$pdf->Cell(30,10, utf8_decode('A quantia de R$'.$venda->valor),0,0);
$pdf->Ln(10);
$pdf->Cell(30,10, utf8_decode('Correspondente a '.$produto->descricao.' e para'),0,0);
$pdf->Ln(10);
$pdf->Cell(30,10, utf8_decode('clareza firmo o presente.'),0,0);
$pdf->Ln(10);
$data = date('d-m-Y');
$data = explode('-', $data);
$pdf->Cell(0, 10, utf8_decode('Campo Grande-MS, ' . $data[0] . ' de ' . getMonth($data[1]) . ' de ' . $data[2]), 0, 1);
$pdf->Ln(10);
$pdf->Cell(30,10, utf8_decode('Assinatura _______________________________'),0,0);
$pdf->Ln(10);
$pdf->Cell(30,10, utf8_decode('Nome Maria José Rodrigues CPF 489.008.341-34'),0,0);

$pdf->Output();
