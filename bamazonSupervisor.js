var mysql = require("mysql");

var inquirer = require("inquirer");

var Table = require('cli-table2');

const chalk = require('chalk');



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

  start();
});



function start()
{


  setTimeout(function(){

      inquirer.prompt([

      {
        type: 'list',
        name: "message",
        message: "What would you like to do?",   
        choices: ["View Product Sales by Department", "Create New Department", "exit"]
      },
      
    ]).then(function(answer) {

      if (answer.message === "View Product Sales by Department")
      {
         viewProductSales();

         
      }

      if (answer.message === "Create New Department")
      {
         createDepartment();
        
         
      }

      if (answer.message === "exit")
      {
        console.log(" ");
        console.log("   Goodbye.")
        console.log(" ");
        process.exit(1);
      }

    })

  },200)
}




function viewProductSales()
{
  

  var query = "SELECT departments.department_name AS department, SUM(products.product_sales) AS product_sales, ANY_VALUE(over_head_costs) AS over_head_costs, ANY_VALUE(department_id) AS department_id ";
    query += "FROM products RIGHT JOIN departments ON (products.department = departments.department_name) GROUP BY departments.department_name";
    connection.query(query, function(err, item) {
    if (err) throw err;


    var table = new Table({
        head: ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit']
      , colWidths: [20, 40],
      style: {
        head: ["yellow"]
      }
      });


        for (var i = 0; i < item.length; i++)
        {
            var product_sale = item[i].product_sales;
            if (product_sale === null)
            {
               product_sale = 0;
            }
            table.push([item[i].department_id, item[i].department, item[i].over_head_costs, product_sale, product_sale - item[i].over_head_costs]);
        }

        console.log(" ");
        console.log(" ");
        console.log(table.toString());
        console.log(" ");
        console.log(" ");
         start();

          });
        
}




function createDepartment()
{

    inquirer.prompt([

              {
                name: "name",
                message: "What is the name of the department?",   
              },

              {
                name: "overheadCost",
                message: "What is the overhead cost of the department"
              },

            ]).then(function(answer) {

              updateDepartment(answer.name, parseInt(answer.overheadCost));

            })


}

function updateDepartment(name, cost)
{
    var query = connection.query(
      "INSERT INTO departments SET ?",
      {
        department_name: name,
        over_head_costs: cost,
      },

      function(err, res) {
        if (err) throw err;
      }
     
    );

    viewProductSales();  
}


