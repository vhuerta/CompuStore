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
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NULL DEFAULT NULL,
  `password` VARCHAR(100) NULL DEFAULT '',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tokens` (
  `id` INT(11) NOT NULL,
  `users_id` INT(11) UNSIGNED NOT NULL,
  `token` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_Token_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Token_users_idx` ON `tokens` (`users_id` ASC);


-- -----------------------------------------------------
-- Table `products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT NOT NULL,
  `name` VARCHAR(200) NULL,
  `key` VARCHAR(4) NULL,
  `description` VARCHAR(500) NULL,
  `price` DOUBLE(12,2) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `store`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `store` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `municipality` VARCHAR(100) NULL,
  `street_number` VARCHAR(200) NULL,
  `zip_code` VARCHAR(5) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stock`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stock` (
  `id` VARCHAR(45) NOT NULL,
  `store_id` INT NOT NULL,
  `products_id` INT NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_stock_store1`
    FOREIGN KEY (`store_id`)
    REFERENCES `store` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_stock_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_stock_products1_idx` ON `stock` (`products_id` ASC);


-- -----------------------------------------------------
-- Table `sales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sales` (
  `id` INT NOT NULL,
  `store_id` INT NOT NULL,
  `users_id` INT(11) UNSIGNED NOT NULL,
  `products_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_sales_store1`
    FOREIGN KEY (`store_id`)
    REFERENCES `store` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_sales_sucursal1_idx` ON `sales` (`store_id` ASC);

CREATE INDEX `fk_sales_users1_idx` ON `sales` (`users_id` ASC);

CREATE INDEX `fk_sales_products1_idx` ON `sales` (`products_id` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

# INSERTS
# DATOS POR DEFECTO

INSERT INTO `users` (`id`, `username`, `password`)
VALUES
	(1, 'vhuertahnz@gmail.com', '$2y$10$NocjtzQLeZ66kPCefrZvBea75TZIbG0HITUUHLNBhbqnb1lTQNHkS');
