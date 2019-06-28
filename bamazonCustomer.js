var mysql = require("mysql");

var inquirer = require("inquirer");

var Table = require('cli-table2');




var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  printItem();
  start();
});



function start()
{

  setTimeout(function(){

  inquirer.prompt([

          {
            name: "id",
            message: "What is the ID of the item you would like to purchase?",   
          },
          {
            name: "units",
            message: "How many would you like?"
          },

        ]).then(function(answer) {

          checkStock(parseInt(answer.id), parseInt(answer.units));

        })
    },100)
}




function checkStock(id, units)
{


  connection.query("SELECT * FROM products WHERE ?",{item_id: id}, function(err, item) {
    if (err) throw err;


      if (item[0].stock_quantity < units)
      {
        console.log("Insufficient quantity!");
      }
      else
      {

        updateItem(id, item[0].stock_quantity - units, units, item[0].product, item[0].price, item[0].product_sales);
      }

    })
    
}





function updateItem(id, newQuantity, units, product, price, productSales) {


  var sales = productSales + price * units;

  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: newQuantity,
        product_sales: sales

      },

      {
        item_id: id
      }     
    ],

    function(err, res) {
      if (err) throw err;
      console.log("Successfully purchased " + units + " " + product + " ." );
      printItem();
      start();
    }
  );

  console.log(query.sql);
}







function printItem()
{
  connection.query("SELECT * FROM products", function(err, item) {
      if (err) throw err;

      console.log(" ");
      var table = new Table({
        head: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity', 'product_sales']
      , colWidths: [20, 40]
      });

        for (var i = 0; i < item.length; i++)
        {
            table.push([item[i].item_id, item[i].product, item[i].department, item[i].price, item[i].stock_quantity, item[i].product_sales]);
        }

        console.log(table.toString());

    })

}







