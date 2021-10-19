const express = require('express');
const exphbs = require('express-handlebars');
const mqsql = require('mysql');
require('dotenv').config();

var favicon = require('serve-favicon')
var path = require('path')


const app = express();
const port = process.env.PORT || 3000;
app.use("/public", express.static('public'));
app.use(favicon(path.join(__dirname, 'public/images', 'fav.ico')))
app.use(express.urlencoded({extended:true}));

//
app.use('/favicon.ico', express.static('public/images/fav.ico'));
//

// Parse application/json
app.use(express.json());

//Static Files
app.use(express.static('public'));


// Templating Engine
app.engine('hbs', exphbs( {extname: '.hbs' }));
app.set('view engine', 'hbs');


//Connection Pool Creation
const pool =mqsql.createPool({
connectionLimit:100,
host           :process.env.DB_HOST,
user           :process.env.DB_USER,
password       :process.env.DB_PASSWORD,
database       :process.env.DB_NAME
});

//connect to db
pool.getConnection((err,connection)=>{
    if(err) throw err;//nnot Connected
    console.log('Connected as ID '+connection.threadId);
});


const routes =require('./servers/routes/product')
app.use('/',routes);

app.listen(port, () => console.log('Listening on port ',+port));