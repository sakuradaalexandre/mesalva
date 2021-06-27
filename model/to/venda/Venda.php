<?php
class Venda
{

    public $id;
    public $cliente_id;
    public $pagamento_id;
    public $data;
    public $valor;
    public $obs;

    /**
     * @return array
     */
    public function getTableColumns() {

        return ['id', 'cliente_id', 'pagamento_id', 'data', 'valor', 'obs'];

    }

}
