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


