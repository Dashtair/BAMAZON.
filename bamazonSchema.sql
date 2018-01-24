CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (100) NOT NULL,
department_name VARCHAR(45) NOT NULL,
price INT default 0,
stock_quantity INT default 0,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('camera', 'electronics', 250, 50),
		('iphone7', 'electronics', 800, 220),
		('blanket', 'bedding', 40, 120),
		('sandals', 'shoes', 100, 7),
		('shirt', 'cloths', 15, 40),
		('notepad', 'office', 10, 300),
		('sofa', 'office', 500, 2),
		('painting', 'office', 250, 2),
		('dresser', 'furniture', 100, 8),
		('ring', 'jewelery', 900, 4);

SELECT * FROM products;

ALTER TABLE products change price price decimal(6, 2);


CREATE TABLE departments (
department_id INTEGER (4) AUTO INCREMENT NOT NULL,
department_name VARCHAR (30) NOT NULL,
over_head_cost INTEGER(6) NOT NULL,
PRIMARY KEY (department_id)
);