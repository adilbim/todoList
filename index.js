var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
//var routes = require('./Rootes/rootes.js');
///////////////////////////////////////////////
//app.use('/todos/api', routes);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hackeddetected",
    database: "adilbim"
});

con.connect(function(err){
    if(err) {console.log(err.sqlMessage);}
    else
    console.log('Conected!');
});
//RUGELAR ROUTES!!

app.get('/', (req, res) =>{
    res.render('home.ejs');
})


//API ROUTES!!!
app.route('/todos/api')
.get(function(req,res){
    con.query('select * from todos', function(err,result){
        if(err){res.send(err);}
        else
        res.send(result);
    });
})
.post(function(req,res){
   var data = req.body;
   data.created_date = Date(Date.now()).substring(0,50);
   data.completed = 'false';
   data.id = uuidv4(); 
    var sql = "INSERT INTO todos (id, name, created_date, completed) VALUES ('"+data.id+"', '"+data.name+"', '"+data.created_date+
    "', '"+data.completed+ "')";

    con.query(sql, function(err,result){
        if(err){res.send(err);}
        else
        res.send(data);
    });
   
});
app.get("/todos/api/:id", function(req, res){
  var sql = "select * from todos where id = '"+req.params.id+"';";  
    con.query(sql, function(err,result){
        if(err){res.send(err);}
        else
        res.send(result);
    });
});
app.put("/todos/api/:id", function(req, res){
var sql = "UPDATE todos SET completed = '" +req.body.completed+ "' WHERE id = '" +req.params.id+ "';";
con.query(sql, function(err,result){
    if(err){res.send(err);}
    else
    res.send(result);
});

});
app.delete("/todos/api/:id", function(req, res){
 var sql = "DELETE FROM todos WHERE id = '"+ req.params.id +"'";   
 con.query(sql, function(err,result){
    if(err){res.send(err);}
    else
    res.send(result);
});
})


//SERVER LISTNER!!
app.listen('3001',function(){
    console.log('server is running sucessfully');
});

