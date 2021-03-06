<?php

class ClienteDao extends Model
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

            ':nome' => $object->nome,
            ':email' => $object->email,
            ':endereco' => $object->endereco,
            ':telefone' => $object->telefone,
            ':instagram' => $object->instagram,
            ':fornecedor' => $object->fornecedor,
            ':pix' => $object->pix,
            ':banco_id' => (int) $object->banco_id,
            ':ag' => $object->ag,
            ':cc' => $object->cc,
            ':recurso' => $object->recurso,
            ':data_nascimento' => $object->data_nascimento,
            ':obs' => $object->obs,
            ':data_de_modificacao' => $object->data_de_modificacao,
            ':documento' => $object->documento,
            ':fornecedor_cod' => $object->fornecedor_cod,
            ':recurso_pago' => $object->recurso_pago,
            ':codigo' => $object->codigo

        ];

        if ($key == null) {
            $array += [':id' => $object->id];
        }

        return $array;
    }

    public function save($dbh, $table, $class, $object)
    {

        if ($object->id == NULL) {

            if ($this->isUnique($dbh, $table, $class, 'codigo', $object->codigo) == true) {

                if ($object->fornecedor == 1) {

                    if ($this->isUnique($dbh, $table, $class, 'fornecedor_cod', $object->fornecedor_cod) == true) {
                        $this->create($table, $object->getTableColumns())->exec($dbh, $class, $this->optionsObject($object));
                        return true;    
                    } else {
                        return false;
                    }
                    
                } else {
                    $this->create($table, $object->getTableColumns())->exec($dbh, $class, $this->optionsObject($object));
                    return true;
                }
            } else {
                return false;
            }

        } else {

            if ($this->isUnique($dbh, $table, $class, 'codigo', $object->codigo, $object->id) == true) {

                if ($object->fornecedor == 1) {

                    if ($this->isUnique($dbh, $table, $class, 'fornecedor_cod', $object->fornecedor_cod, $object->id) == true) {
                        $this->update($table, $object->getTableColumns(), 'id')->where('id = ' . $object->id)->exec($dbh, $class, $this->optionsObject($object, 1));
                        return true;
                    } else {
                        return false;
                    }
                    
                } else {
                    $this->update($table, $object->getTableColumns(), 'id')->where('id = ' . $object->id)->exec($dbh, $class, $this->optionsObject($object, 1));
                    return true;
                }

            } else {
                return false;
            }
        }
    }

    public function trataNumero($numero)
    {

        $numero = preg_replace("/\./", '', $numero);
        $numero = preg_replace("/\-/", '', $numero);
        $numero = preg_replace("/\ /", '', $numero);
        $numero = preg_replace("/\(/", '', $numero);
        $numero = preg_replace("/\)/", '', $numero);



        return $numero;
    }

    public function setCreateColumns($dbh, $table, $class, $id, $request)
    {

        date_default_timezone_set('America/Campo_Grande');

        if ($id == null) {
            $cliente = new Cliente();
            $cliente->nome = $request['nome'];
            $cliente->email = $request['email'];
            $cliente->endereco = $request['endereco'];
            $cliente->telefone = $this->trataNumero($request['telefone']);
            $cliente->instagram = $request['instagram'];
            $cliente->obs = $request['obs'];
            $cliente->data_nascimento = date('Y-m-d H:i:s');
            $cliente->fornecedor = $request['fornecedor'] == "true" ? 1 : 0;
            $cliente->data_de_modificacao = date("Y-m-d H:i:s");
            $cliente->codigo = $request['codigo'];

            $cliente->recurso = $request['fornecedor'] == "true" ? (float) $request['recurso'] : 0.0;
            $cliente->pix = $request['fornecedor'] == "true" ? $request['pix'] : null;
            $cliente->banco_id = $request['fornecedor'] == "true" ? $request['banco'] : null;
            $cliente->ag = $request['fornecedor'] == "true" ? $request['ag'] : null;
            $cliente->cc = $request['fornecedor'] == "true" ? $request['cc'] : null;
            $cliente->documento = $request['fornecedor'] == "true" ? $request['documento'] : null;
            $cliente->fornecedor_cod = $request['fornecedor'] == "true" ? $request['fornecedor_cod'] : null;
            $cliente->recurso_pago = 0.0;
        }

        return $cliente;
    }

    public function setUpdateColumns($dbh, $table, $class, $id, $request)
    {

        date_default_timezone_set('America/Campo_Grande');

        $cliente = $this->all($table)->find('id', $id, '=')->first()->exec($dbh, $class);

        $cliente->nome = $request['nome'];
        $cliente->email = $request['email'];
        $cliente->endereco = $request['endereco'];
        $cliente->telefone = $this->trataNumero($request['telefone']);
        $cliente->instagram = $request['instagram'];
        $cliente->obs = $request['obs'];
        $cliente->data_nascimento = $request['data_nascimento'] != null ? $request['data_nascimento'] : date('Y-m-d H:i:s');
        $cliente->fornecedor = $request['fornecedor'] == "true" ? 1 : 0;
        $cliente->codigo = $request['codigo'];

        $cliente->recurso = $request['fornecedor'] == "true" ? (float) $request['recurso'] : 0.0;
        $cliente->pix = $request['fornecedor'] == "true" ? $request['pix'] : null;
        $cliente->banco_id = $request['fornecedor'] == "true" ? $request['banco'] : null;
        $cliente->ag = $request['fornecedor'] == "true" ? $request['ag'] : null;
        $cliente->cc = $request['fornecedor'] == "true" ? $request['cc'] : null;
        $cliente->documento = $request['fornecedor'] == "true" ? $request['documento'] : null;
        $cliente->fornecedor_cod = $request['fornecedor'] == "true" ? $request['fornecedor_cod'] : null;

        return $cliente;
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

    public function isUnique($dbh, $table, $class, $column, $value, $id=null) {
        $obj = $this->all($table)->where($column.' = '."'".$value."'")->first()->exec($dbh, $class);
        
        if ($id != null) {
            if ($obj == null) {
                return true;
            } else if ($obj->id == $id) {
                return true;
            }
        } else {
            if ($obj == null) {
                return true;
            }
        }

        return false;
    }
}
