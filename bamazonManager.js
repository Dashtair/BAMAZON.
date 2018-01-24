var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'bamazon_db'
});

//Set counter for total number of products

var numberOfProductTypes = 0;

//Connect to DB
connection.connect(function(err) {
	if(err) throw err;
	new Promise(function(resolve, reject){
		connection.query('SELECT * FROM products', function(err, res) {
			if(err) reject(err);
			resolve(res);
			console.log('WElcome manager!')

		});

		}).then(function(result) {
		result.forEach(function(item) {
			numberOfProductTypes++;
		});

		return enterManagerApp();

		//catch errors
	}).catch(function(err) {
		console.log(err);
	});
});

function enterManagerApp() {
	inquirer.prompt([{
		name: 'entrance',
		message: 'What would you like to do?',
		type:'list',
		choices: ['View product for sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
	}]).then(function(answer) {
		switch (answer.entrance) {
			case 'View product for sale':
			itemForSale();
			break;
			case 'View Low Inventory':
			lowInventory();
			break;
			case 'Add to Inventory':
			addInventory();
			break;
			case 'Add New Product':
			addProduct();
			break;
			case 'Exit':
			console.log('Bye!');
			connection.destroy();
			return;
			break;
			default:
			enterManagerApp();
			break
	};
});
}

//Logs all items
function logItems(result) {
	result.forEach(function(item) {
		numberOfProductTypes++;
		console.log('Item ID: ' + item.item_id + '|| Product Name: ' + item.product_name + ' || Department: ' + item.department_name + '|| Price: ' + item.price + '|| Stock: ' + item.stock_quantity);

	});
}

function itemsForSale() {
	return new Promis(function(resolve, reject) {
		connection.query('SELECT * FROM products', function(err, res) {
			if(err) reject (err);
			resolve(res);
		});
	}).then(function(result) {
		logItems(result);
	}).then(function() {
		enterManagerApp();
	}).catch(function(err) {
		console.log(err);
		connection.destroy();
	});
}

function lowInventory() {
	return new Promise(function(resolve, reject) {
		connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err, res) {
		if (err) reject(err);
		resolve(res);	
		});
	}).then(function(result) {
		logItems(result);
	}).then(function() {
		enterManagerApp();
	}).catch(function(err) {
		console.log(err);
		connection.destroy();
	});
}

function addInventory() {
	return inquirer.prompt([{
		name: 'item',
		message: 'Enter the item number of the product you would like to add stock to.',
		type: 'input',
		validate: function(value) {
if((isNaN(value) === false) && (value <=numberOfProductTypes)){
	return true;
} else {
	console.log('\nPlease enter a valid ID.');
	return false;
}
		}
	}, {
		name:'quantity',
		message: 'How much stock would you like to add?',
		type: 'input',
		validate: function(value) {
			if(isNaN(value) === false) {
				return true;
			} else {
				console.log('\nPlease enter a valid quantity.');
				return fasle;
			}
		}
	}]).then(function(answer){
		return new Promise(function(resolve, reject) {
			connection.query ('SELECT stock_quantity FROM products WHERE ?' , {item_id: answer.item}, function(err, res){
			   if(err) reject(err);
			   resolve(res);	
		});
		
	}).then(function(result) {
		var updateQuantity = parseInt(result[0].stock_quantity) + parseInt(answer.quantity);
		var itemId = answer.item;
		connection.query('UPDATE products SET ? WHERE ?', [{
			stock_quantity: updateQuantity
		}, {
			item_id: itemId
		}], function(err, res) {
			if(err) throw err;
			console.log('The total stock has been updated to: ' + updateQuantity + '.');
				enterManagerApp();
		});
			
		}).catch(function(err) {
			console.log(err);
			connection.destroy();
		});
	}).catch(function(err) {
		console.log(err);
		connection.destroy();
	});
}

function addProduct() {
	return inquirer.prompt([{
		name: 'product',
		message: 'Enter the name of the product you would like to add.',
		type: 'input',
		validate: function(value) {
if(value === '') {
	console.log('\nPlease enter a valid name.');
		return false;
	} else {
		return true;
	}
}
	}, {
		name:'department',
		message: 'Enter the name of the department where the product is located',
		type: 'input',
		validate: function(value) {
			if(value === '') {
				console.log('\nPlease enter a valid department.');
				return fasle;
			} else {
				return true;
			}
		}
	}, {
		name: 'price',
		message: 'Enter the price of the product.',
		type: 'input',
		validate: function(value) {
			if(isNan(value) === false) {
				return true;
			} else {
				console.log('\nPlease enter a valid price.');
				return false;
			}
		}
	}, {
		name: 'quantity',
		message: 'Enter the amount of initial stock quantity.',
		type: 'input',
		validate: function(value) {
			if(isNan(value) === false) {
				return true;
			} else {
				console.log('\nPlease enter a valid quantity.');
				return false;
			}
		}
	}]).then(function(answer){
		return new Promise(function(resolve, reject) {
			connection.query ('INSERT INTO products SET ?',[{
				product_name: answer.department,
				department_name: answer.department,
				price: answer.price,
				stock_quantity: answer.quantity
			}], function(err, res) {
				if (err) reject(err);
				resolve(res);
			});
		
	}).then(function() {
		console.log('The product has been added to the inventory.');
		enterManagerApp();
	}).catch(function(err) {
		console.log(err);
		connection.destroy();
	   });
			
	}).catch(function(err) {
		console.log(err);
		connection.destroy();
	});
}