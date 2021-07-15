<?php

class ProdutoDao extends Model {

    public $sql;

    public function __construct () {}

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


    public function optionsObject($object, $key = null) {

        $array = [

            ':codigo' => $object->codigo,
            ':descricao' => $object->descricao,
            ':marca' => $object->marca,
            ':tamanho' => $object->tamanho,
            ':cor' => $object->cor,
            ':preco' => (float) $object->preco,
            ':img' => $object->img,
            ':situacao' => (int) $object->situacao

        ];

        if ($key == null) {
            $array += [':id' => $object->id];
        }

        return $array;

    }

    public function isUnique($dbh, $table, $class, $column, $value, $id=null) {
        $obj = $this->all($table)->where($column.' = '."'".$value."'")->first()->exec($dbh, $class);
        
        if ($id != null) {
            if ($obj->id == $id) {
                return true;
            }
        } else {
            if ($obj == null) {
                return true;
            }
        }

        return false;
    }

    public function save($dbh, $table, $class, $object) {

        if ($object->id == NULL) {

            if ($this->isUnique($dbh, $table, $class, 'codigo', $object->codigo) == true) {
                $this->create($table, $object->getTableColumns())->exec($dbh, $class, $this->optionsObject($object));
                return true;
            } else {
                return false;
            }
            
        } else {

            if ($this->isUnique($dbh, $table, $class, 'codigo', $object->codigo, $object->id) == true) {
                $this->update($table, $object->getTableColumns(), 'id')->where('id = '.$object->id)->exec($dbh, $class, $this->optionsObject($object, 1));
                return true;
            } else {
                return false;
            }
        }

    }
    
    public function trataNumero($numero) {
        
        $numero = preg_replace("/\./", '', $numero);
        $numero = preg_replace("/\-/", '', $numero);
        $numero = preg_replace("/\ /", '', $numero);
        $numero = preg_replace("/\(/", '', $numero);
        $numero = preg_replace("/\)/", '', $numero);
        
        
        
        return (int) $numero;
        
    }

    public function setCreateColumns($dbh, $table, $class, $id, $request) {

        if ($id == null) {
            $produto = new Produto();
            $produto->codigo = $request['codigo'];
            $produto->descricao = $request['descricao'];
            $produto->marca = $request['marca'];
            $produto->tamanho = $request['tamanho'];
            $produto->cor = $request['cor'];
            $produto->preco = (float) $request['preco'];
            $produto->img = $request['img'] != ''? $request['img']: null;
            $produto->situacao = $request['situacao'];

        } 

        return $produto;

    }
    
    public function setUpdateColumns($dbh, $table, $class, $id, $request) {

        if ($id != null) {
            $produto = $this->all($table)->find('id', $id)->first()->exec($dbh, $class);
            $produto->codigo = $request['codigo'] != ''? $request['codigo']: $produto->codigo;
            $produto->descricao = $request['descricao'] != ''? $request['descricao']: $produto->descricao;
            $produto->marca = $request['marca'] != ''? $request['marca']: $produto->marca;
            $produto->tamanho = $request['tamanho'] != ''? $request['tamanho']: $produto->tamanho;
            $produto->cor = $request['cor'] != ''? $request['cor']: $produto->cor;
            $produto->preco = $request['preco'] != ''? (float) $request['preco']: $produto->preco;
            $produto->img = $request['img'] != ''? $request['img']: $produto->img;
            $produto->situacao = $request['situacao'] != ''? (int) $request['situacao']: $produto->situacao;

        }

        return $produto;

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
    
    public function getLastInsertedId($dbh) {
        return parent::getLastInsertedId($dbh);
    }


}