
const mysql = require('mysql');

const con =  mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345',
});

let createDatabase = function ( query ){
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


createDatabase( 'CREATE DATABASE IF NOT EXISTS new_world')
   .then( function( result ){

      console.log(result);} ) 

   .then( function(){
        con.end( function(err , result){
        if(err) console.log('failed end connection!');} );
      } )

.catch( function( status ){
  console.log(status);
} );
