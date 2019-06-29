# Bamazon

This project creates a Amazon-like storefront with the MySQL skills. The app takes in orders from customers and depletes stock from the store's inventory. It also tracks product sales across departments and then provide a summary of the highest-grossing departments in the store.

<br>



## Installation
```
$ npm i
$ npm install inquirer
$ npm install mysql
$ npm install cli-table2
```

<br>

## Usage Demo
Customer View
```
$ node bamazonCustomer.js
```

![](customer.gif)

<br>

Manager View
```
$ node bamazonManager.js
```
![](Manager.gif)

<br>

Supervisor View
```
$ node bamazonSupervisor.js
```
![](Supervisor.gif)

<br>
<br>
<br>



## Code Snippet
How I use MYSQL GROUP BY, JOINS and aliases to generate a summerized table in terminal:
```SQL

 SELECT departments.department_name AS department, SUM(products.product_sales) AS product_sales, 
 ANY_VALUE(over_head_costs) AS over_head_costs, ANY_VALUE(department_id) AS department_id
  
 FROM products RIGHT JOIN departments ON (products.department = departments.department_name) 
 GROUP BY departments.department_name

```

<br>
<br>

## Technology Used


* Command Line
* Node.js
* Inquirer NPM
* mysql NPM
* cli-table2 NPM

<br>

## Author
Chloe Zhou