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
            message: "What is the ID of the item you would like to purchase? (q to exit)",   
          },

           ]).then(function(answer) {

          if (answer.id === "q")
          {
                  process.exit(1);
          }
          else
          {
                  inquirer.prompt([

                {
                  name: "units",
                  message: "How many would you like? (q to exit)"
                },

              ]).then(function(answer2) {

                if (answer2.units === "q")
                {
                  process.exit(1);
                }

                checkStock(parseInt(answer.id), parseInt(answer2.units));

              })
          }
        
        });
  
    },100)
}




function checkStock(id, units)
{


  connection.query("SELECT * FROM products WHERE ?", {item_id: id}, function(err, item) {
    if (err) throw err;


      if (item[0].stock_quantity < units)
      {
        console.log(" ");
        console.log("Insufficient quantity!");
        console.log(" ");
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
      console.log(" ");
      console.log("Successfully purchased " + units + " " + product + " ." );
      printItem();

      start();
    }
  );

}







function printItem()
{
  connection.query("SELECT * FROM products", function(err, item) {
      if (err) throw err;

      console.log(" ");
      var table = new Table({
        head: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity', 'product_sales']
      , colWidths: [20, 40],
      style: {
        head: ["green"]
      }
      });

        for (var i = 0; i < item.length; i++)
        {
            table.push([item[i].item_id, item[i].product, item[i].department, item[i].price, item[i].stock_quantity, item[i].product_sales]);
        }

        console.log(" ");
        console.log(" ");
        console.log(table.toString());
        console.log(" ");
        console.log(" ");

    })

}







