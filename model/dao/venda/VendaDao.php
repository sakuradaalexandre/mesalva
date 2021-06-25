<?php

class VendaDao extends Model
{

    public $sql;

    public function __construct()
    {
    }

    public function exec($dbh, $class, $options = null)
    {
        return parent::exec($dbh, $class, $options); // TODO: Change the autogenerated stub
    }

    public function all($table)
    {
        return parent::all($table); // TODO: Change the autogenerated stub
    }

    public function where($options)
    {
        return parent::where($options); // TODO: Change the autogenerated stub
    }

    public function order($options)
    {
        return parent::order($options); // TODO: Change the autogenerated stub
    }

    public function find($column, $value, $operator = '=')
    {
        return parent::find($column, $value, $operator); // TODO: Change the autogenerated stub
    }

    public function update($table, $table_columns, $key)
    {
        return parent::update($table, $table_columns, $key); // TODO: Change the autogenerated stub
    }

    public function create($table, $table_columns)
    {
        return parent::create($table, $table_columns); // TODO: Change the autogenerated stub
    }

    public function first()
    {
        return parent::first(); // TODO: Change the autogenerated stub
    }

    public function select($table, $columns)
    {
        return parent::select($table, $columns); // TODO: Change the autogenerated stub
    }

    public function custom($sql)
    {
        return parent::custom($sql); // TODO: Change the autogenerated stub
    }

    public function leftJoin($table1, $table2, $key1, $key2)
    {
        return parent::leftJoin($table1, $table2, $key1, $key2); // TODO: Change the autogenerated stub
    }

    public function rightJoin($table1, $table2, $key1, $key2)
    {
        return parent::rightJoin($table1, $table2, $key1, $key2); // TODO: Change the autogenerated stub
    }

    public function innerJoin($table1, $table2, $key1, $key2)
    {
        return parent::innerJoin($table1, $table2, $key1, $key2); // TODO: Change the autogenerated stub
    }

    public function join($table1, $table2, $key1, $key2)
    {
        return parent::join($table1, $table2, $key1, $key2); // TODO: Change the autogenerated stub
    }

    public function execwoclass($dbh, $options = [])
    {
        return parent::execwoclass($dbh, $options); // TODO: Change the autogenerated stub
    }

    public function group($column)
    {
        return parent::group($column); // TODO: Change the autogenerated stub
    }


    public function optionsObject($object, $key = null)
    {

        $array = [

            ':cliente_id' => (int) $object->cliente_id,
            ':produto_id' => (int) $object->produto_id,
            ':valor' => (float) $object->valor,
            ':pagamento_id' => (int) $object->pagamento_id,
            ':data' => $object->data,
            ':obs' => $object->obs

        ];

        if ($key == null) {
            $array += [':id' => $object->id];
        }

        return $array;
    }

    public function save($dbh, $table, $class, $object)
    {

        if ($object->id == NULL) {

            return $this->create($table, $object->getTableColumns())->exec($dbh, $class, $this->optionsObject($object));
        } else {
            return $this->update($table, $object->getTableColumns(), 'id')->where('id = ' . $object->id)->exec($dbh, $class, $this->optionsObject($object, 1));
        }
    }

    public function trataNumero($numero)
    {

        $numero = preg_replace("/\./", '', $numero);
        $numero = preg_replace("/\-/", '', $numero);
        $numero = preg_replace("/\ /", '', $numero);
        $numero = preg_replace("/\(/", '', $numero);
        $numero = preg_replace("/\)/", '', $numero);



        return (int) $numero;
    }

    public function setCreateColumns($dbh, $table, $class, $id, $request)
    {

        date_default_timezone_set('America/Campo_Grande');

        if ($id == null) {
            $venda = new Venda();
            $venda->cliente_id = $request['cliente_id'];
            $venda->produto_id = $request['produto_id'];
            $venda->valor = $request['valor'];
            $venda->pagamento_id = $request['pagamento_id'];
            $venda->data = $request['data'] == null ? date('Y-m-d H:i:s') : $request['data'];
            $venda->obs = $request['obs'];
        }

        return $venda;
    }

    public function setUpdateColumns($dbh, $table, $class, $id, $request)
    {

        date_default_timezone_set('America/Campo_Grande');

        if ($id != null) {
            $venda = $this->all($table)->find('id', $id)->first()->exec($dbh, $class);
            $venda->cliente_id = $request['cliente_id'] == null ? $venda->cliente_id : $request['cliente_id'];
            $venda->produto_id = $request['produto_id'] == null ? $venda->produto_id : $request['produto_id'];
            $venda->valor = $request['valor'] == null ? $venda->valor : $request['valor'];
            $venda->pagamento_id = $request['pagamento_id'] == null ? $venda->pagamento_id : $request['pagamento_id'];
            $venda->data = $request['data'] == null ? $venda->data : $request['data'];
            $venda->obs = $request['obs'] == null ? $venda->obs : $request['obs'];
        }

        return $venda;
    }

    public function delete($table, $key, $id)
    {
        return parent::delete($table, $key, $id); // TODO: Change the autogenerated stub
    }

    public function joinwopktable($table1, $table2, $key1, $key2)
    {
        return parent::joinwopktable($table1, $table2, $key1, $key2); // TODO: Change the autogenerated stub
    }

    public function to_object(array $array, $class = 'stdClass')
    {
        return parent::to_object($array, $class); // TODO: Change the autogenerated stub
    }

    public function createiatable($table, $table_columns)
    {
        return parent::createiatable($table, $table_columns); // TODO: Change the autogenerated stub
    }

    public function getLastInsertedId($dbh)
    {
        return parent::getLastInsertedId($dbh);
    }
}
