
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
		    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "exit"]
		  },
		  
		]).then(function(answer) {

		  if (answer.message === "View Products for Sale")
		  {
		     viewProduct();
		  }

		  if (answer.message === "View Low Inventory")
		  {
		     viewLowInventory();
		  }

		  if (answer.message === "Add to Inventory")
		  {
		     addInventory();
		  }

		  if (answer.message === "Add New Product")
		  {
		      addProduct();
		  }

		  if (answer.message === "exit")
		  {
		  	console.log(" ");
		  	console.log("   Goodbye.")
		  	console.log(" ");
		    process.exit(1);
		  }

		})

	},100)
}




function viewProduct()
{

      connection.query("SELECT * FROM products", function(err, item) {
      if (err) throw err;

      console.log(" ");
      var table = new Table({
        head: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity', 'product_sales']
      , colWidths: [20, 50],
      style: {
        head: ["magenta"]
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
     start();
}







function viewLowInventory()
{


	connection.query("SELECT * FROM products WHERE stock_quantity BETWEEN 0 AND 4", function(err, item) {
      if (err) throw err;

      console.log(" ");
      var table = new Table({
        head: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity', 'product_sales']
      , colWidths: [20, 50],
      style: {
        head: ["magenta"]
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
      start();

}





function addInventory()
{

	inquirer.prompt([

					  {
					    name: "name",
					    message: "What is the name of the inventory you would like to add more?",   
					  },

					  {
					    name: "quantity",
					    message: "How many do you want to add?"
					  },

				  ]).then(function(answer) {

				  	updateProduct(answer.name, parseInt(answer.quantity));

				  })

}



function addProduct()
{
	connection.query("SELECT department_name FROM departments", function(err, item) {

		var choices = [];
		for (var i = 0; i < item.length; i++)
		{
			choices.push(item[i].department_name);
		}

		inquirer.prompt([

			  {
			    name: "name",
			    message: "What is the name of the product you would like to add?",   
			  },

			  {
			  	type: 'list',
			    name: "department",
			    message: "Which department does this product fall into?",
			    choices: choices
			  },

			  {
			    name: "cost",
			    message: "How much does it cost?"
			  },

			  {
			    name: "quantity",
			    message: "How many do we have?"
			  },

		  ]).then(function(answer) {

		  	createProduct(answer.name, answer.department, parseInt(answer.cost), parseInt(answer.quantity));

		})

	})


}





function updateProduct(name, quantity) 

{
  connection.query("SELECT stock_quantity FROM products WHERE ?", {product: name}, function(err, item) {
  		var stock = item[0].stock_quantity + quantity;

	  var query = connection.query(
	    "UPDATE products SET ? WHERE ?",
	    [
	      {
	        stock_quantity: stock
	      },

	      {
	        product: name
	      }
	    ],

	    function(err, res) {
	      if (err) throw err;
	      console.log(" ");
	      console.log("Successfully added " + quantity + " " + name + " ." );
	      console.log(" ");
	      console.log(" ");
	      start();
	    }
	 );
     })
  };




  function createProduct(name, department, cost, quantity) 
 {

	var query = connection.query(
	    "INSERT INTO products SET ?",
	    {
	      product: name,
	      department: department,
	      price: cost,
	      stock_quantity: quantity 
	    },

	    function(err, res) {
	      if (err) throw err;
	    }
  );
  console.log(" ");
  console.log(" ");
  start();
}