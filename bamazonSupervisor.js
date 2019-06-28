var mysql = require("mysql");

var inquirer = require("inquirer");

var Table = require('cli-table2');


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
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
        process.exit(1);
      }

    })

  },100)
}




function viewProductSales()
{
  

          var query = "SELECT ANY_VALUE(departments.department_name) AS department, SUM(products.product_sales) AS product_sales, MAX(over_head_costs) AS over_head_costs, MAX(department_id) AS department_id ";
            query += "FROM products RIGHT JOIN departments ON (products.department = departments.department_name) GROUP BY products.department";
            connection.query(query, function(err, item) {
            if (err) throw err;

    console.log(item);

    var table = new Table({
        head: ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit']
      , colWidths: [20, 40]
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

        console.log(table.toString());

          });

          start();
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
        console.log(res.affectedRows + " new product inserted!\n");

      }
     
    );
    viewProductSales();
    start();
    // logs the actual query being run
    console.log(query.sql);

}


