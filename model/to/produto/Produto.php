<?php
class Produto
{

    public $id;
    public $codigo;
    public $descricao;
    public $marca;
    public $tamanho;
    public $cor;
    public $preco;
    public $img;
    public $situacao;

    /**
     * @return array
     */
    public function getTableColumns() {

        return ['id', 'codigo', 'descricao', 'marca', 'tamanho', 'cor', 'preco', 'img', 'situacao'];

    }

}
