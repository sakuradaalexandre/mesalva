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

$fornecedor_produto = $cliente_bo->all()->join('fornecedor_produto', 'id', 'cliente_id')->joinwopktable('fornecedor_produto', 'produto', 'produto_id', 'id')->where('cliente.id = ' . $id)->execwoclass();

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


$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->SetMargins(25, null, 25);
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 10);
$pdf->SetTextColor(255, 0, 0);

$data = date('d-m-Y');

$data = explode('-', $data);

$pdf->Cell(0, 10, utf8_decode($data[0] . ' de ' . getMonth($data[1]) . ' de ' . $data[2]), 0, 1, 'R');
$pdf->Cell(0, 10, utf8_decode('PEÇAS DE DESAPEGO DA(O) ' . strtoupper($cliente->nome)), 0, 1, '');

$pdf->SetTextColor(0, 0, 0);
$pdf->Cell(0, 10, utf8_decode('TOTAL DE ' . $qtd_pecas . ' PEÇAS'), 0, 1, '');
$pdf->MultiCell(0, 10, utf8_decode('QUE SERÃO ENTREGUES DE MODO CONSIGNAÇÃO, ONDE O BRECHO, FARÁ HIGIENIZAÇÃO DAS PEÇAS, POSTAGEM DE DIVULGAÇÃO, E VENDA.'), 0, 1);
$pdf->MultiCell(0, 10, utf8_decode('POR UM PERIODO DE 50 DIAS, FINDANDO ESSE PRAZO, O PAGAMENTO SERA EFETUADO DA SEGUINTE FORMA,'), 0, 1);
$pdf->SetTextColor(255, 0, 255);
$pdf->MultiCell(0, 10, utf8_decode('40% DO VALOR DA VENDA, SERÁ PAGO, Á PROPRIETARIA DAS PEÇAS.'), 0, 1);
$pdf->SetTextColor(0, 0, 0);
$pdf->MultiCell(0, 10, utf8_decode('60 % FICARA COM O BRECHÓ, CASO QUEIRA DEIXAR POR MAIS 30 DIAS, REFAREMOS O CONTRATO. ABAIXO OS PREÇOS, CASO QUEIRA MODIFICAR ALGUM PREÇO, E SÓ AVISAR, PREÇO SUGERIDO!!'), 0, 1);

$pdf->SetWidths(Array(15, 55, 27, 26, 20, 17));

$table_rows = [];

$pdf->Row([utf8_decode('Código'), utf8_decode('Descrição'), utf8_decode('Marca'), utf8_decode('Cor'), utf8_decode('Tamanho'), utf8_decode('Preço')]);

for ($i = 0; $i < count($fornecedor_produto); $i++) {

    $pdf->Row(Array(utf8_decode($fornecedor_produto[$i]->codigo), utf8_decode($fornecedor_produto[$i]->descricao), utf8_decode($fornecedor_produto[$i]->marca), utf8_decode($fornecedor_produto[$i]->cor), utf8_decode($fornecedor_produto[$i]->tamanho), utf8_decode('R$ '.$fornecedor_produto[$i]->preco)));

};

$pdf->Ln(20);

$pdf->Cell(0, 10, utf8_decode('GRATA'), 0, 1, '');
$pdf->Cell(0, 10, utf8_decode('MARIA JOSE(ME SALVA BRECHÓ)'), 0, 1, '');

$pdf->Output();
