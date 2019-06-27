
var mysql = require("mysql");

var inquirer = require("inquirer");


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

	printItem();

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
    console.log(item[0].stock_quantity);

    	if (item[0].stock_quantity < units)
    	{
    		console.log("Insufficient quantity!");
    	}
    	else
    	{

    		updateItem(id, item[0].stock_quantity - units, units, item[0].product);
    	}

    })
    
}


function updateItem(id, newQuantity, units, product) {
  console.log("Updating ...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: newQuantity
      },
      {
        item_id: id
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " items updated!\n");
      console.log("Successfully purchsed " + units + " " + product + " ." );
      printItem();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function printItem()
{
	connection.query("SELECT * FROM products", function(err, item) {
    if (err) throw err;
    		
    		console.log("                                                                                    ");
    		console.log("item_id   product_name                     department_name   price   stock_quantitiy" );
    		console.log("_______   ______________________________   _______________   _____   _______________" );
    		for (var i = 0; i < item.length; i++)
            {
                console.log(item[i].item_id + "           " + item[i].product + "   " + item[i].department + "   " + item[i].price + + "   " + item[i].stock_quantity);
            }

    	})


}


