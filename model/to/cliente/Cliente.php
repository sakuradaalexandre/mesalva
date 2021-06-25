<?php
class Cliente
{

    public $id;
    public $nome;
    public $email;
    public $endereco;
    public $telefone;
    public $instagram;
    public $fornecedor;
    public $pix;
    public $banco_id;
    public $ag;
    public $cc;
    public $recurso;
    public $data_nascimento;
    public $obs;
    public $data_de_modificacao;
    public $documento;
    public $fornecedor_cod;
    public $recurso_pago;
    public $codigo;

    /**
     * @return array
     */
    public function getTableColumns() {

        return ['id', 'nome', 'email', 'endereco', 'telefone', 'instagram', 'fornecedor', 'pix', 'banco_id', 'ag', 'cc', 'recurso', 'data_nascimento', 'obs', 'data_de_modificacao', 'documento', 'fornecedor_cod', 'recurso_pago', 'codigo'];

    }

}
