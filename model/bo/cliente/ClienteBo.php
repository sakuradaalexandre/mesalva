<?php


class ClienteBo
{

    private $cliente_dao;
    private $table;
    private $class;
    private $dbh;
    private $key;

    public function __construct($dbh) {
        $this->cliente_dao = new ClienteDao();
        $this->table = 'cliente';
        $this->class = 'Cliente';
        $this->dbh = $dbh;
        $this->key = 'id';
    }

    public function exec($options = null)
    {
        return $this->cliente_dao->exec($this->dbh, $this->class, $options); // TODO: Change the autogenerated stub
    }

    public function all()
    {
        $this->cliente_dao->all($this->table);
        return $this;
    }

    public function where($options)
    {
        $this->cliente_dao->where($options); // TODO: Change the autogenerated stub
        return $this;
    }

    public function order($options)
    {
        $this->cliente_dao->order($options); // TODO: Change the autogenerated stub
        return $this;
    }

    public function find($value, $operator = '=')
    {
        $this->cliente_dao->find($this->key, $value, $operator); // TODO: Change the autogenerated stub
        return $this;
    }

    public function update($table_columns, $key)
    {
        $this->cliente_dao->update($this->table, $table_columns, $key); // TODO: Change the autogenerated stub
        return $this;
    }

    public function create($table_columns)
    {
        $this->cliente_dao->create($this->table, $table_columns); // TODO: Change the autogenerated stub
        return $this;
    }

    public function save($object)
    {
        return $this->cliente_dao->save($this->dbh, $this->table, $this->class, $object);
    }

    public function setCreateColumns($id, $request) {
        return $this->cliente_dao->setCreateColumns($this->dbh, $this->table, $this->class, $id, $request);
    }
    
    public function setUpdateColumns($id, $request) {
        return $this->cliente_dao->setUpdateColumns($this->dbh, $this->table, $this->class, $id, $request);
    }

    public function first() {
        $this->cliente_dao->first();
        return $this;
    }

    public function delete($object) {

        $this->cliente_dao->delete($this->table, $this->key, $object->id);
        return $this;

    }

    public function execwoclass($options = null) {

        return $this->cliente_dao->execwoclass($this->dbh, $options); // TODO: Change the autogenerated stub

    }

    public function select($columns) {

        $this->cliente_dao->select($this->table, $columns);
        return $this;

    }

    public function join($table2, $key1, $key2) {

        $this->cliente_dao->join($this->table, $table2, $key1, $key2);
        return $this;
    }

    public function group($column) {

        $this->cliente_dao->group($column);
        return $this;

    }

    public function joinwopktable($table1, $table2, $key1, $key2) {

        $this->cliente_dao->join($table1, $table2, $key1, $key2);

        return $this;

    }
    
    public function getLastInsertedId() {
        return $this->cliente_dao->getLastInsertedId($this->dbh);
    }
    
    public function trataNumero($numero) {
        return $this->cliente_dao->trataNumero($numero);
    }

    public function custom($sql) {

        $this->cliente_dao->custom($sql);
        return $this;

    }


}