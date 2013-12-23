CREATE TABLE `merkuri2_delivery`.`pedidos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `telefono` VARCHAR(45) NULL,
  `direccion` VARCHAR(250) NULL,
  `paga_con` VARCHAR(45) NULL,
  `pedido` TEXT NULL,
  `estado` INT NULL,
  `fecha_alta` DATETIME NULL,
  `fecha_update` DATETIME NULL,
  `usuario_id` INT NULL,
  `owner` INT NULL,
  PRIMARY KEY (`id`));