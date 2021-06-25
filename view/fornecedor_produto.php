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

$fornecedor_produto = $cliente_bo->all()->join('fornecedor_produto', 'id', 'cliente_id')->joinwopktable('fornecedor_produto', 'produto', 'produto_id', 'id')->where('cliente.id = '.$id)->execwoclass();

$qtd_pecas = $fornecedor_produto != null ? count($fornecedor_produto) : 0;

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

class PDF extends FPDF
{
    
    function Header()
    {
        
        $this->Image('../img/pdf.png', 10, 6, 30);
        
        $this->SetFont('Arial', 'B', 15);
        
        $this->Cell(80);
        
        $this->Ln(40);
    }

    
    function Footer()
    {
    
        $this->SetY(-15);
    
        $this->SetFont('Arial', 'I', 8);
    
    }
}


$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->SetMargins(25, null, 25);
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 10);
$pdf->SetTextColor(255, 0, 0);

$data = date('d-m-Y');

$data = explode('-', $data);

$pdf->Cell(0, 10, utf8_decode($data[0] . ' de ' . getMonth($data[1]) . ' de ' . $data[2]), 0, 1, 'R');
$pdf->Cell(0, 10, utf8_decode('PEÇAS DE DESAPEGO DA(O) '.strtoupper($cliente->nome)), 0, 1, '');

$pdf->SetTextColor(0, 0, 0);
$pdf->Cell(0, 10, utf8_decode('TOTAL DE '.$qtd_pecas.' PEÇAS'), 0, 1, '');
$pdf->MultiCell(0, 10, utf8_decode('QUE SERÃO ENTREGUES DE MODO CONSIGNAÇÃO, ONDE O BRECHO, FARÁ HIGIENIZAÇÃO DAS PEÇAS, POSTAGEM DE DIVULGAÇÃO, E VENDA.'), 0, 1);
$pdf->MultiCell(0, 10, utf8_decode('POR UM PERIODO DE 50 DIAS, FINDANDO ESSE PRAZO, O PAGAMENTO SERA EFETUADO DA SEGUINTE FORMA,'), 0, 1);
$pdf->SetTextColor(255, 0, 255);
$pdf->MultiCell(0, 10, utf8_decode('40% DO VALOR DA VENDA, SERÁ PAGO, Á PROPRIETARIA DAS PEÇAS.'), 0, 1);
$pdf->SetTextColor(0, 0, 0);
$pdf->MultiCell(0, 10, utf8_decode('60 % FICARA COM O BRECHÓ, CASO QUEIRA DEIXAR POR MAIS 30 DIAS, REFAREMOS O CONTRATO. ABAIXO OS PREÇOS, CASO QUEIRA MODIFICAR ALGUM PREÇO, E SÓ AVISAR, PREÇO SUGERIDO!!'), 0, 1);

foreach ($fornecedor_produto as $fp) {

    $pdf->Cell(15, 10, utf8_decode($fp->codigo), 1, 0);    
    $pdf->Cell(47, 10, utf8_decode($fp->descricao), 1, 0);    
    $pdf->Cell(57, 10, utf8_decode($fp->nome), 1, 0);    
    $pdf->Cell(16, 10, utf8_decode($fp->cor), 1, 0);    
    $pdf->Cell(10, 10, utf8_decode($fp->tamanho), 1, 0);    
    $pdf->Cell(15, 10, utf8_decode('R$ '.$fp->preco), 1, 1);    

};

$pdf->Ln(20);

$pdf->Cell(0, 10, utf8_decode('GRATA'), 0, 1, '');
$pdf->Cell(0, 10, utf8_decode('MARIA JOSE(ME SALVA BRECHÓ)'), 0, 1, '');

$pdf->Output();
