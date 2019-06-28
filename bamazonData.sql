DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product VARCHAR(45) NULL,
  department VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity DECIMAL(10,2) NULL,
  product_sales DECIMAL(10,2) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product, department, price, stock_quantity, product_sales)
VALUES ("Uncharted 4", "Video Games", 49.95, 150,0),
("DOOM", "Video Games", 59.99, 200,0),
("Crate of Spam", "Food and Drink", 24.5, 50,0),
("Cool Shades", "Apparel", 75, 5,0),
("Worn Denim Jeans", "Apparel", 54.25, 35,0),
("Survival Towel", "Necessities", 42.42, 42,0),
("Bill and Ted's Excellent Adventure", "Films", 15, 25,0),
("Mad Max: Fury Road", "Films", 25.5, 57,0),
("Monopoly", "Board Games", 30.5, 35,0),
("Yahtzee", "Board Games", 19.95, 23,0);



CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  over_head_costs DECIMAL(10,2) NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Video Games", 200),
("Food and Drink", 100),
("Apparel", 50),
("Necessities", 300),
("Films", 35),
("Board Games", 0);







