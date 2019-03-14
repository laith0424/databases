var express = require('express');
var bodyParser = require('body-parser');
var login = require('./js/login');
var sign_up = require('./js/sign_up');
var item_completed = require('./js/item_completed');
var delete_an_item = require('./js/delete_an_item');
var delete_a_list = require('./js/delete_a_list');
var create_new_item = require('./js/create_new_item');
var creat_new_list = require('./js/creat_new_list');

var app = express();


app.set('view engine' , 'ejs');
app.set('views' , __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use( bodyParser.urlencoded( { extended: false } ) );


app.get('/' , ( req , res )=>{
    res.render( 'default', {title: 'Welcome'} );
} );

app.get('/login' , ( req , res )=>{
    res.render( 'login' ); 
} );



app.post('/user' , ( req , res )=>{

   login( req , res );
} );




app.get('/sign_up' , ( req , res )=>{
    res.render( 'sign_up' ); 
} );

app.post('/signing' , ( req , res )=>{

   sign_up(req, res);
} );








app.post('/user/creat_new_list' , ( req , res )=>{
    
    creat_new_list( req , res );
   // res.redirect( '/login' );
 
 } );


 app.post('/user/delete_a_list' , ( req , res )=>{
    
 
    delete_a_list( req , res );
   // res.redirect( '/login' );
 
 } );

 app.post('/user/create_new_item' , ( req , res )=>{
    
 
    create_new_item( req , res );
 
 } );

 app.post('/user/delete_an_item' , ( req , res )=>{
    
 
    delete_an_item( req , res );
 
 } );

 app.post('/user/item_completed' , ( req , res )=>{
  
 
    item_completed( req , res );
 
 } );




 var server = app.listen( 4343 , ()=> {
   console.log("Listening");
} );
