<?php
class Venda
{

    public $id;
    public $produto_id;
    public $cliente_id;
    public $pagamento_id;
    public $data;
    public $valor;
    public $obs;

    /**
     * @return array
     */
    public function getTableColumns() {

        return ['id', 'produto_id', 'cliente_id', 'pagamento_id', 'data', 'valor', 'obs'];

    }

}
