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

$produto_venda = $venda_bo->all()->join('produto_venda', 'id', 'venda_id')->where('venda.id = ' . $venda->id)->execwoclass();

foreach ($produto_venda as $pv) {
    $produtos[] = $produto_bo->all()->find($pv->produto_id)->first()->exec();
}

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

function fillFone($fone)
{

    $r = array();
    $flag = 0;
    for ($i = 0, $j = 0; $i < strlen($fone); $i++, $j++) {
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

    function SetWidths($w)
    {
        //Set the array of column widths
        $this->widths = $w;
    }

    function SetAligns($a)
    {
        //Set the array of column alignments
        $this->aligns = $a;
    }

    function Row($data)
    {
        //Calculate the height of the row
        $nb = 0;
        for ($i = 0; $i < count($data); $i++) {
            $nb = max($nb, $this->NbLines($this->widths[$i], $data[$i]));
        }
        $h = 5 * $nb;
        //Issue a page break first if needed
        $this->CheckPageBreak($h);
        //Draw the cells of the row
        for ($i = 0; $i < count($data); $i++) {
            $w = $this->widths[$i];
            $a = isset($this->aligns[$i]) ? $this->aligns[$i] : 'L';
            //Save the current position
            $x = $this->GetX();
            $y = $this->GetY();
            //Draw the border
            $this->Rect($x, $y, $w, $h);
            //Print the text
            $this->MultiCell($w, 5, $data[$i], 0, $a);
            //Put the position to the right of the cell
            $this->SetXY($x + $w, $y);
        }
        //Go to the next line
        $this->Ln($h);
    }

    function CheckPageBreak($h)
    {
        //If the height h would cause an overflow, add a new page immediately
        if ($this->GetY() + $h > $this->PageBreakTrigger)
            $this->AddPage($this->CurOrientation);
    }

    function NbLines($w, $txt)
    {
        //Computes the number of lines a MultiCell of width w will take
        $cw = &$this->CurrentFont['cw'];
        if ($w == 0)
            $w = $this->w - $this->rMargin - $this->x;
        $wmax = ($w - 2 * $this->cMargin) * 1000 / $this->FontSize;
        $s = str_replace("\r", '', $txt);
        $nb = strlen($s);
        if ($nb > 0 and $s[$nb - 1] == "\n")
            $nb--;
        $sep = -1;
        $i = 0;
        $j = 0;
        $l = 0;
        $nl = 1;
        while ($i < $nb) {
            $c = $s[$i];
            if ($c == "\n") {
                $i++;
                $sep = -1;
                $j = $i;
                $l = 0;
                $nl++;
                continue;
            }
            if ($c == ' ')
                $sep = $i;
            $l += $cw[$c];
            if ($l > $wmax) {
                if ($sep == -1) {
                    if ($i == $j)
                        $i++;
                } else
                    $i = $sep + 1;
                $sep = -1;
                $j = $i;
                $l = 0;
                $nl++;
            } else
                $i++;
        }
        return $nl;
    }
}

$produto_texto = '';

foreach ($produtos as $p) {

    $produto_texto .= $p->descricao;
    
    if ($p != end($produtos)) {
        $produto_texto .= ', ';
    }
}

// Instanciation of inherited class
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->SetMargins(25, null, 25);
$pdf->AddPage();

$pdf->Ln(20);

$pdf->SetFont('Arial', '', 14);

$pdf->SetWidths(Array(40, 40, 40, 40));

$table_rows = [];

$pdf->Row([utf8_decode('Cliente'), utf8_decode('Produto(s)'), utf8_decode('Valor'), utf8_decode('Data')]);


$pdf->Row(Array(utf8_decode($cliente->nome), utf8_decode($produto_texto), utf8_decode('R$ '.$venda->valor), utf8_decode($venda->data)));


$pdf->Output();
