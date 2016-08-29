# ************************************************************
# Sequel Pro SQL dump
# Versión 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.13)
# Base de datos: compustore
# Tiempo de Generación: 2016-08-29 05:42:10 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Volcado de tabla products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `key` varchar(4) DEFAULT NULL,
  `price` double(12,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`id`, `name`, `key`, `price`)
VALUES
	(1,'MacBook Pro 13\'\'','MB13',23000.00),
	(2,'Acer Aspire 11','AA11',6000.00),
	(3,'Dell Inspiron X3','DX30',12000.00),
	(4,'iMac 27\'\'','IM27',30000.00);

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla sales
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sales`;

CREATE TABLE `sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) NOT NULL,
  `users_id` int(11) unsigned NOT NULL,
  `products_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sales_sucursal1_idx` (`store_id`),
  KEY `fk_sales_users1_idx` (`users_id`),
  KEY `fk_sales_products1_idx` (`products_id`),
  CONSTRAINT `fk_sales_products1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_store1` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla stocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stocks`;

CREATE TABLE `stocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) NOT NULL,
  `products_id` int(11) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_stock_store1` (`store_id`),
  KEY `fk_stock_products1_idx` (`products_id`),
  CONSTRAINT `fk_stock_products1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_stock_store1` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `stocks` WRITE;
/*!40000 ALTER TABLE `stocks` DISABLE KEYS */;

INSERT INTO `stocks` (`id`, `store_id`, `products_id`, `stock`)
VALUES
	(1,1,1,10),
	(2,1,2,5),
	(3,1,3,3),
	(4,1,4,12),
	(5,2,1,3),
	(6,2,2,0),
	(7,2,3,2),
	(8,2,4,6),
	(9,3,1,7),
	(10,3,2,8),
	(11,3,3,2),
	(12,3,4,20);

/*!40000 ALTER TABLE `stocks` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla stores
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stores`;

CREATE TABLE `stores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;

INSERT INTO `stores` (`id`, `name`, `state`)
VALUES
	(1,'SUCURSAL CDMX','CDMX'),
	(2,'SUCURSAL LEON','GTO'),
	(3,'SUCURSAL GUADALAJARA','GLD');

/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tokens
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tokens`;

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) unsigned NOT NULL,
  `token` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Token_users_idx` (`users_id`),
  CONSTRAINT `fk_Token_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `password`)
VALUES
	(1,'admin@test.com','$2y$10$NocjtzQLeZ66kPCefrZvBea75TZIbG0HITUUHLNBhbqnb1lTQNHkS');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
