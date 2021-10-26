CREATE TABLE `productdb`.`products` ( `id` INT NOT NULL AUTO_INCREMENT , `productName` VARCHAR(50) NOT NULL , `currentState` ENUM('Manufacturing','Testing','Storage','Sold') NOT NULL DEFAULT 'Manufacturing' , `dateCaptured` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ) ENGINE = InnoDB;

ALTER TABLE `products` ADD `status` VARCHAR NOT NULL DEFAULT 'active' AFTER `dateCaptured`;