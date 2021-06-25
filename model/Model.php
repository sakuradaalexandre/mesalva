<?php


class Model {

    public function execwoclass($dbh, $options = []) {

//        if (current_user_can('administrator')) {
//
//            var_dump($this->sql);
//            var_dump($options);
//             
//        }
//        die;

        
//        var_dump($this->sql);

        $first = strpos($this->sql, ' LIMIT 1');

        $sth = $dbh->prepare($this->sql);

        $sth->execute($options);

        $result = null;
        
        $results = null;

        $result = $sth->fetchAll();

        if ($result != null) {

            foreach ($result as $r) {
                $results[] = $this->to_object($r);
            }


            if ($first !== false) {
                $results = $results[0];

            }

//            if (current_user_can('administrator')) {
//
//                foreach ($results as $r) {
//                    var_dump($r->situacao);
//                    echo '<br />';
//                }
//
//            }
        }

        $this->sql = '';
        return $results;
    }

	public function exec($dbh, $class, $options = []) {

//            if (current_user_can('administrator')) {
//
//                var_dump($this->sql);
//                var_dump($options);
//
//            }
            
//            var_dump($options);
//            var_dump($this->sql);
            
            $first = strpos($this->sql, ' LIMIT 1');

            $insert = strpos($this->sql, 'INSERT INTO');

            $sth = $dbh->prepare($this->sql);

            $sth->execute($options);

            $result = null;

            if ($insert !== false) {
                return $dbh->lastInsertId();
            }
            
            while ($obj = $sth->fetchObject($class)) {
                $result[] = $obj;
            }

            if ($result != null) {
                if ($first !== false) {
                    $result = $result[0];
                }
            }

            $this->sql = '';
            return $result;
	}

	 public function all($table) {
             
	    $this->sql .= 'SELECT * FROM '.$table;

	    return $this;

	}

	public function where($options) {

		if ($options == null) {
			return $this->sql;
		}

		$this->sql .= ' WHERE '.$options;

		return $this;

	}

	public function order($options) {

		$this->sql .= ' ORDER BY '.$options;

		return $this;

	}

	public function find($column, $value, $operator = '=') {

	    $this->sql .= ' WHERE '.$column.' '.$operator.' '.$value;

        return $this;

    }

    public function update($table, $table_columns, $key) {
        
        $this->sql = "UPDATE ".$table." SET ";
        
        if (is_string($key)) {
            
            foreach ($table_columns as $column) {
                
                if ($column != $key) {

                    $this->sql .= $column . " = :" . $column;

                    if ($column != end($table_columns)) {
                        $this->sql .= ", ";
                    }

                }
                
            }
            
        } else {
            
            if ($key != null) {
                
                foreach ($table_columns as $column) {
                
                    $valid = true;
                    
                    foreach ($key as $k) { 
                        
                        if ($column == $k) {
                            
                            $valid = false;
                            
                        }
                        
                    }
                    
                    if ($valid == true) {
                        
                        $this->sql .= $column . " = :" . $column;

                        if ($column != end($table_columns)) {
                            $this->sql .= ", ";
                        }
                        
                    }
                
                }
                
            }
            
        }


        return $this;

    }

    public function create($table, $table_columns) {

	    $this->sql = "INSERT INTO ".$table." (".implode(", ", $table_columns).") VALUES (:".implode(", :", $table_columns).");";

        return $this;

    }

    public function delete($table, $key, $id) {

        $this->sql = "DELETE FROM ".$table." WHERE ".$key." = ".$id;

        return $this;

    }
    
    public function deleteiatable($table, $key1, $key2, $value1, $value2) {

        $this->sql = "DELETE FROM ".$table." WHERE ".$key1." = ".$value1." AND ".$key2." = ".$value2;

        return $this;

    }

    public function first() {
	    $this->sql .= ' LIMIT 1';

	    return $this;
    }

    public function select($table, $columns) {

	    $this->sql = "SELECT ".$columns." FROM ".$table;

	    return $this;

    }

    public function custom($sql) {

	    $this->sql = $sql;

	    return $this;
    }

    public function leftJoin($table1, $table2, $key1, $key2) {

	    $this->sql .= " LEFT JOIN ".$table2." ON ".$table1.".".$key1." = ".$table2.".".$key2;

        return $this;

    }

    public function rightJoin($table1, $table2, $key1, $key2) {

        $this->sql .= " RIGHT JOIN ".$table2." ON ".$table1.".".$key1." = ".$table2.".".$key2;

        return $this;

    }

    public function innerJoin($table1, $table2, $key1, $key2) {

        $this->sql .= " INNER JOIN ".$table2." ON ".$table1.".".$key1." = ".$table2.".".$key2;

        return $this;

    }

    public function join($table1, $table2, $key1, $key2) {

	    $this->leftJoin($table1, $table2, $key1, $key2);

	    return $this;

    }

    public function joinwopktable($table1, $table2, $key1, $key2) {

        $this->leftJoin($table1, $table2, $key1, $key2);

        return $this;

    }

    public function group($column) {

        $this->sql .= " GROUP BY ".$column;

        return $this;

    }

    public function to_object(array $array, $class = 'stdClass')
    {
        $object = new $class;
        foreach ($array as $key => $value)
        {
            if (is_array($value))
            {
                // Convert the array to an object
                $value = $this->to_object($value, $class);
            }
            // Add the value to the object
            $object->{$key} = $value;
        }
        return $object;
    }

    public function createiatable($table, $table_columns) {

        $this->sql = "INSERT INTO ".$table." (".implode(", ", $table_columns).") VALUES (:".implode(", :", $table_columns).");";

        return $this;

    }

    public function getLastInsertedId($dbh) {

        return $dbh->lastInsertId();

    }

    public function updateiatable($table, $table_columns, $key) {

        $this->sql = "UPDATE ".$table." SET ";

        foreach ($table_columns as $column) {

            if ($column != $key) {

                $this->sql .= $column . " = :" . $column;

                if ($column != end($table_columns)) {
                    $this->sql .= ", ";
                }

            }

        }

        return $this;

    }
    
    public function limit($limit) {
	    $this->sql .= ' LIMIT '.$limit;

	    return $this;
    }

}