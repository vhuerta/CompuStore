-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema compustore
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema compustore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `compustore` DEFAULT CHARACTER SET utf8 ;
USE `compustore` ;

-- -----------------------------------------------------
-- Table `compustore`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `compustore`.`users` ;

CREATE TABLE IF NOT EXISTS `compustore`.`users` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NULL DEFAULT NULL,
  `password` VARCHAR(100) NULL DEFAULT '',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `compustore`.`tokens`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `compustore`.`tokens` ;

CREATE TABLE IF NOT EXISTS `compustore`.`tokens` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `users_id` INT(11) UNSIGNED NOT NULL,
  `token` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_Token_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `compustore`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Token_users_idx` ON `compustore`.`tokens` (`users_id` ASC);


-- -----------------------------------------------------
-- Table `compustore`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `compustore`.`products` ;

CREATE TABLE IF NOT EXISTS `compustore`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL,
  `key` VARCHAR(4) NULL,
  `price` DOUBLE(12,2) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `compustore`.`store`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `compustore`.`stores` ;

CREATE TABLE IF NOT EXISTS `compustore`.`stores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `compustore`.`stock`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `compustore`.`stocks` ;

CREATE TABLE IF NOT EXISTS `compustore`.`stocks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `store_id` INT NOT NULL,
  `products_id` INT NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_stock_store1`
    FOREIGN KEY (`store_id`)
    REFERENCES `compustore`.`store` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_stock_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `compustore`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_stock_products1_idx` ON `compustore`.`stock` (`products_id` ASC);


-- -----------------------------------------------------
-- Table `compustore`.`sales`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `compustore`.`sales` ;

CREATE TABLE IF NOT EXISTS `compustore`.`sales` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `store_id` INT NOT NULL,
  `users_id` INT(11) UNSIGNED NOT NULL,
  `products_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_sales_store1`
    FOREIGN KEY (`store_id`)
    REFERENCES `compustore`.`store` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `compustore`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `compustore`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_sales_sucursal1_idx` ON `compustore`.`sales` (`store_id` ASC);

CREATE INDEX `fk_sales_users1_idx` ON `compustore`.`sales` (`users_id` ASC);

CREATE INDEX `fk_sales_products1_idx` ON `compustore`.`sales` (`products_id` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


# INSERTS
# DATOS POR DEFECTO
INSERT INTO `users` (`id`, `username`, `password`)
VALUES
	(1, 'vhuertahnz@gmail.com', '$2y$10$NocjtzQLeZ66kPCefrZvBea75TZIbG0HITUUHLNBhbqnb1lTQNHkS');

INSERT INTO `store` (`id`, `name`, `state`)
VALUES
	(1, 'SUCURSAL CDMX', 'CDMX'),
	(2, 'SUCURSAL LEON', 'GTO'),
	(3, 'SUCURSAL GUADALAJARA', 'GLD');

INSERT INTO `products` (`id`, `name`, `key`, `price`)
VALUES
	(1, 'MacBook Pro 13\'\'', 'MB13', 23000.00),
	(2, 'Acer Aspire 11', 'AA11', 6000.00),
	(3, 'Dell Inspiron X3', 'DX30', 12000.00),
	(4, 'iMac 27\'\'', 'IM27', 30000.00);

INSERT INTO `stock` (`id`, `store_id`, `products_id`, `stock`)
VALUES
	(1, 1, 1, 10),
	(2, 1, 2, 5),
	(3, 1, 3, 7),
	(4, 1, 4, 3),
	(5, 2, 1, 0),
	(6, 2, 2, 3),
	(7, 2, 3, 10),
	(8, 2, 4, 1),
	(9, 3, 1, 0),
	(10, 3, 2, 0),
	(11, 3, 3, 2),
	(12, 3, 4, 20);
