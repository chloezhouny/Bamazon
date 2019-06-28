DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product VARCHAR(45) NULL,
  department VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity DECIMAL(10,2) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("Uncharted 4", "Video Games", 49.95, 150),
("DOOM", "Video Games", 59.99, 200),
("Crate of Spam", "Food and Drink", 24.5, 50),
("Cool Shades", "Apparel", 75, 5),
("Worn Denim Jeans", "Apparel", 54.25, 35),
("Survival Towel", "Necessities", 42.42, 42),
("Bill and Ted's Excellent Adventure", "Films", 15, 25),
("Mad Max: Fury Road", "Films", 25.5, 57),
("Monopoly", "Board Games", 30.5, 35),
("Yahtzee", "Board Games", 19.95, 23);









