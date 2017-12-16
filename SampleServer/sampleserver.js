var http = require('http');
var express = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');

/** Database Configuration */
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'sampledb'
});
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());


/** Get Customer Detail End Point */
app.get("/api/customer.json",function(req,res){
	connection.query('SELECT * from customer', function(err, rows, fields) {
		if (!err){
			res.setHeader('Content-Type', 'application/json');
			res.send(rows);
		}else{
			console.log('Error while performing Query.');
		}
	});
});

/** Save Customer Detail */
app.post('/api/save', function(req, res){
	 var sql = "INSERT INTO customer (name, address) VALUES ('"+req.body.customer.name+"','"+req.body.customer.address+"')";
	 connection.query(sql,function (err, result) {
    if (err) throw err;
	console.log(req.body.customer.name +" " + req.body.customer.address);
    console.log("Number of records inserted: " + result.affectedRows);
	res.send(result)
  });
    
});



app.listen(8080);