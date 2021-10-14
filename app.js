const express = require('express');
const ejs = require('ejs');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mqsql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


// Parsing middle
//Parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended:false}));


// Parse application/json
app.use(bodyParser.json());

//Static Files
app.use(express.static('public'));


// Templating Engine
app.engine('hbs', exphbs( {extname: '.hbs' }));
app.set('view engine', 'hbs');


//Connection Pool Creation
const pool =mqsql.createPool({
connectionLimit:100,
host           :process.env.DB_HOST,
user:process.env.DB_USER,
database:process.env.DB_NAME
});

//connect to db
pool.getConnection((err,connection)=>{
    if(err) throw err;//nnot Connected
    console.log('Connected as ID '+connection.threadId);
});


const routes =require('./servers/routes/product')
app.use('/',routes);





// Connection Pool
// You don't need the connection here as we have it in userController
// let connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });
 

// const routes = require('./server/routes/user');
// app.use('/', routes);


app.listen(port, () => console.log('Listening on port ',+port));