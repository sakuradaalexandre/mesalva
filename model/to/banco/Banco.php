<?php
class Banco
{

    public $id;
    public $nome;

    /**
     * @return array
     */
    public function getTableColumns() {

        return ['id', 'nome'];

    }

}
