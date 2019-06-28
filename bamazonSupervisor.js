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
  

          var query = "SELECT products.department, SUM(products.product_sales) AS product_sales, MAX(over_head_costs) AS over_head_costs, MAX(department_id) AS department_id ";
            query += "FROM products RIGHT JOIN departments ON (products.department = departments.department_name) GROUP BY products.department";
            connection.query(query, function(err, item) {
            if (err) throw err;


    var table = new Table({
        head: ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit']
      , colWidths: [20, 40]
      });

        for (var i = 0; i < item.length; i++)
        {
            table.push([item[i].department_id, item[i].department, item[i].over_head_costs, item[i].product_sales, item[i].product_sales - item[i].over_head_costs]);
        }

        console.log(table.toString());



          });

          start();

}


