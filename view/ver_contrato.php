<?php
require_once '../model/fpdf.php';

require_once '../model/Connections.php';

include_once '../model/Model.php';

include_once '../model/to/cliente/Cliente.php';
include_once '../model/dao/cliente/ClienteDao.php';
include_once '../model/bo/cliente/ClienteBo.php';

$connections = new Connections();

$id = $_GET['id'];

$con = $connections->makeConnection('mesalva', 'root', 'root');

$cliente_bo = new ClienteBo($con);

$cliente = $cliente_bo->all()->find($id)->first()->exec();

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
        $this->Image('../img/pdf.png', 10, 6, 30);
        // Arial bold 15
        $this->SetFont('Arial', 'B', 15);
        // Move to the right
        $this->Cell(80);
        // Title
        //$this->Cell(30,10, utf8_decode('Contrato de consignação de roupas.'),0,0,'C');
        // Line break
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
$pdf->SetFont('Arial', 'B', 16);
$pdf->Cell(0, 10, utf8_decode('Contrato de consignação de roupas.'), 0, 1, 'C');

$pdf->Ln(20);

$pdf->SetFont('Arial', '', 14);
$text = 'Eu Maria José Rodrigues, responsável pela empresa MARIA JOSÉ RODRIGUES 48900834134, nome de fantasia ME SALVA BRECHÓ, inscrita sob no CNPJ 37.980.529/0001-29, recebi de ' . $cliente->nome . ', portadora do CPF no '. $cliente->documento .', fone ' . fillFone($cliente->telefone) . ', sob Consignação as peças de roupas de desapago fashion, relacionadas em planilha anexo.
Comprometo-me a pagar as peças assim que as mesmas forem vendidas pelo meu Brechó, por um prazo de 30 dias, sendo assim as peças que não forem vendidas serão devolvidas.
Fica acordado que o valor total das peças, serão divididos entre ambas as partes da seguinte forma:
*50% do Brechó
*50% - 6% (tx de adm de cartão debito/credito) da cliente, dona das peças, acima citada.';

$pdf->MultiCell(0, 10, utf8_decode($text), 0, 1);

$pdf->Ln(20);

$data = date('d-m-Y');

$data = explode('-', $data);

$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(0, 10, utf8_decode('Campo Grande-MS, ' . $data[0] . ' de ' . getMonth($data[1]) . ' de ' . $data[2]), 0, 1);

$pdf->Ln(20);

$pdf->SetFont('Arial', '', 14);

$pdf->Cell(0, 10, utf8_decode('____________________                                   ____________________'), 0, 1);
$pdf->Cell(0, 10, utf8_decode('     Me Salva Brechó                                                     Fornecedor'), 0, 1);

$pdf->Output();
