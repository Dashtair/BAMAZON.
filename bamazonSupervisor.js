var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'bamazon_db'
});

connection.connect(function(err) {
	if(err) throw err;
});

var Table = require('cli-table');

function viewSales() {
	connection.query('SELECT department_id, department_name, over_head_cost, sales SUM (products.sales) AS department.total_sales FROM departments INNER JOIN products ON departments.department_id = products.department_id GROUP BY department.department_id',
	
	function(err, res) {
		if(err) throw err;
		var table = new Table ({
			head: ['department_id', 'department_name', 'over_head_cost', 'product_sales', 'total_profit'],
			colWdth: [100, 200]
		});
		for (var i = 0; i < department.department_id.length; i++) {
			department.total_sales = product_sales - department.over_head_cost;
			table.push['department.department_id', 'department+name', 'department.over_head_cost', 'product.product_sales', 'department.total_sales']
		}
	});

connection.end();
}
function newDept() {
	var overHead;
	inquirer.prompt([{
		name:'departmentName',
		type: 'input',
		message: 'Waht department would you like to create?',
	},
	{
		name: 'overHead',
		type: 'input',
		message: 'What over head would you assign to this department?',
	}

	]).then(function(answer) {
		var dName = answer.departmentName;
		var oHead = JSON.parse(answer.overHead);
		console.log(dName);
		console.log(oHead);
		connection.query('INSERT INTO departments (department_name, over_head_cost) VALUES(?, ?)', [{department_name: dName}, {over_head_cost: oHead}],
			function(err, results) {
				if(err) throw err;
				console.log('Department created: ' + dName);
				return;
			});
	});
}

function supervisor() {
	inquirer.prompt({
		name: 'viewOrCreate',
		type: 'rawlist',
		message: 'Would you like to view sales by department or create a department?',
		choices:['VIEW', 'CREATE']
	}).then(function(answer) {
		if(answer.viewOrCreate == 'VIEW') {
			viewSales();
		} else {
			newDept();
		}
	});
}
supervisor();