CREATE TABLE `banco` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `banco` (`id`, `nome`)
VALUES
	(1,'Banco do Brasil'),
	(2,'Bradesco'),
	(3,'Itaú'),
	(4,'Caixa Econômica'),
	(5,'Nubank'),
	(6,'Sicred'),
	(7,'Safra');

CREATE TABLE `cliente` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `telefone` bigint(12) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `fornecedor` tinyint(1) DEFAULT NULL,
  `pix` varchar(255) DEFAULT NULL,
  `banco_id` int(11) DEFAULT NULL,
  `ag` varchar(255) DEFAULT NULL,
  `cc` varchar(255) DEFAULT NULL,
  `recurso` float DEFAULT '0',
  `data_nascimento` timestamp NULL DEFAULT NULL,
  `obs` varchar(255) DEFAULT '',
  `data_de_modificacao` timestamp NULL DEFAULT NULL,
  `documento` varchar(255) DEFAULT NULL,
  `fornecedor_cod` varchar(255) DEFAULT NULL,
  `recurso_pago` float DEFAULT '0',
  `codigo` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `fornecedor_produto` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cliente_id` int(11) DEFAULT NULL,
  `produto_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `pagamento` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `produto` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `tamanho` varchar(255) DEFAULT NULL,
  `cor` varchar(255) DEFAULT NULL,
  `preco` float DEFAULT '0',
  `img` varchar(255) DEFAULT NULL,
  `situacao` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `venda` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cliente_id` int(11) DEFAULT NULL,
  `pagamento_id` int(11) DEFAULT NULL,
  `data` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `valor` float DEFAULT '0',
  `obs` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

CREATE TABLE `produto_venda` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `produto_id` int(11) DEFAULT NULL,
  `venda_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;