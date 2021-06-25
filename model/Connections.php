<?php

class Connections {

	public function __construct () {}

	public function makeConnection($database, $root, $pass) {

		try {
		    return new PDO('mysql:host=localhost;dbname='.$database, $root, $pass, array( PDO::ATTR_PERSISTENT => true, PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\'' ));
		} catch (PDOException $e) {
		    print "Error!: " . $e->getMessage() . "<br/>";
		    die();
		}

	}

	public function closeConnection() {
		return null;
	}



}

?>
