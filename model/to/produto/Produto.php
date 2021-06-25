<?php
class Produto
{

    public $id;
    public $codigo;
    public $descricao;
    public $marca;
    public $tamanho_id;
    public $cor_id;
    public $preco;
    public $img;
    public $situacao;

    /**
     * @return array
     */
    public function getTableColumns() {

        return ['id', 'codigo', 'descricao', 'marca', 'tamanho_id', 'cor_id', 'preco', 'img', 'situacao'];

    }

}
