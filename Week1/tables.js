
const mysql = require('mysql');
const fs = require('fs');  


let newQuery =  JSON.parse( fs.readFileSync( 'tables.json' , 'utf8' ) );


const con =  mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345',
  database: 'new_world'
});



let createTables = function ( query ){
  
  return new Promise( function( resolve , reject ){
   
    con.connect(function(err) {

      if (err) {
        reject( 'failed connection!' );
      }
      else{
        console.log("Connected successfully!");

       con.query( query , function (err) {

          if (err) reject('Query failed!');

    
          resolve('created successfully!');  
        });
     
      }
     
    });


  } ) ;
}


createTables( newQuery[0]['country'] )
   .then( function( result ){
      console.log(result);} )
 
   .then( function(){

    con.query( newQuery[1]['city']  , function(err , result){
      if(err) console.log('failed! Query!');} );


   } )
   .then( function(){

    con.query( newQuery[2]['language']  , function(err , result){
      if(err) console.log('failed! Query!');} );


   } )
   .then( function(){
        con.end( function(err , result){
        if(err) console.log('failed!');} );} )
        .then( function(){} )
      

.catch( function( status ){
  console.log(status);
} );
