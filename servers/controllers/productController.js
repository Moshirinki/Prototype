const { render } = require('ejs');
const mysql= require('mysql');


// //Connection Pool Creation
const pool =mysql.createPool({
connectionLimit :100,
host            :process.env.DB_HOST,
user            :process.env.DB_USER,
database        :process.env.DB_NAME
});




// View Products
exports.view=(req,res)=>{
    //connect to db
pool.getConnection((err,connection)=>{
    if(err) throw err;//nnot Connected
    console.log('Connected as ID '+connection.threadId);
// 
//Use the cinnection

///query
connection.query('SELECT * FROM products',(err,rows)=>{
//When the connection is done we need to release it

connection.release();
if(!err){
    res.render('home',{rows})
}
else{
    console.log(err)
}
});
});
}

// Find Products
exports.find=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;//nnot Connected
        console.log('Connected as ID '+connection.threadId);
    // 

    let searchTerm=req.body.search;
    //Use the cinnection
    ///query
    connection.query('SELECT * FROM products WHERE productName LIKE ?',['%' + searchTerm + '%'],(err,rows)=>{
    //When the connection is done we need to release it
    
    connection.release();
    if(!err){
        res.render('home',{rows})
    }
    else{
        console.log(err)
    } 
    });
    
    });


}

// Rendering  Products Page
exports.formAdd=(req,res)=>{
    
 res.render('addProduct')
}   

// Add new Products
exports.create=(req,res)=>{
    
pool.getConnection((err,connection)=>{
    if(err) throw err;//nnot Connected
    console.log('Connected as ID '+connection.threadId);
const {productName, currentState}=req.body;

let searchTerm=req.body.search;
//Use the cinnection
///query
connection.query('INSERT INTO products SET productName = ?, currentState = ?',[productName,currentState],(err,rows)=>{
//When the connection is done we need to release it

connection.release(); 
if(!err){
    res.render('addProduct',{alert:'Product added successfully'})
}
else{
    console.log(err)
}
});
});
}

//  Rendering Edit Products Page
exports.edit=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;//nnot Connected
        console.log('Connected as ID '+connection.threadId);
    connection.query('SELECT * FROM products WHERE serialID = ?',[req.params.serialID],(err,rows)=>{
    connection.release();
    if(!err){
        res.render('editProduct',{rows})
    }
    else{
        console.log(err)
    }
    });
    });
}   

//  Update Products Page
exports.update=(req,res)=>{
const {productName,currentState}=req.body;

    pool.getConnection((err,connection)=>{
        if(err) throw err;//nnot Connected
        console.log('Connected as ID '+connection.threadId);
    // 
    //Use the cinnection
    
    ///query
    connection.query('UPDATE products SET currentState = ? ',[currentState,req.params.serialID],(err,rows)=>{
    //When the connection is done we need to release it
    
    connection.release();
    if(!err){
        pool.getConnection((err,connection)=>{
            if(err) throw err;//nnot Connected
            console.log('Connected as ID '+connection.threadId);
        connection.query('SELECT * FROM products WHERE serialID = ?',[req.params.serialID],(err,rows)=>{
        connection.release();
        if(!err){
            res.render('editProduct',{rows,alert:`${productName} process Updated Successfully`})

        }
        else{
            console.log(err)
        }
        });
        });
    }
    else{
        console.log(err)
    }
    });
    });
}  

//  Deleting an Item
exports.delete=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err;//nnot Connected
        console.log('Connected as ID '+connection.threadId);
    connection.query('DELETE FROM products WHERE serialID = ?',[req.params.serialID],(err,rows)=>{
    connection.release();
    if(!err){
        let deletedProduct= encodeURIComponent('Product Successfully deleted')
        res.redirect('/?removed='+ deletedProduct);
    }
    else{
        console.log(err)
    }
    });
    });
} 

// View Single product
exports.viewSingle=(req,res)=>{
    //connect to db
pool.getConnection((err,connection)=>{
    if(err) throw err;//nnot Connected
    console.log('Connected as ID '+connection.threadId);
// 
//Use the cinnection

///query
connection.query('SELECT * FROM products WHERE serialID = ?',[req.params.serialID],(err,rows)=>{
//When the connection is done we need to release it

connection.release();
if(!err){
    res.render('viewProduct',{rows})
}
else{
    console.log(err)
}
});
});
}