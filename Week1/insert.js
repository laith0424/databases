
const mysql = require('mysql');
const fs = require('fs');  


let newQuery =  JSON.parse( fs.readFileSync( 'insert.json' , 'utf8' ) );


const con =  mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345',
  database: 'new_world'
});



let createInsert = function ( ){
  
  return new Promise( function( resolve , reject ){
   
    con.connect(function(err) {

      if (err) {
        reject( 'failed connection!' );
      }
      else{
        console.log("Connected successfully!");
        resolve('Connected successfully!');

     
      }
     
    });


  } ) ;
}


createInsert( ) 
   .then( function(  ){


    newQuery.forEach(element => {

      con.query( element[['query']]  , function(err , result){
        if(err) console.log('failed! Query!');} );
    
    });

    console.log(  'Data inserted!'  );

   } )

   .then( function(){
        con.end( function(err , result){
        if(err) console.log('failed!');} );} )
        
      

.catch( function( status ){
  console.log(status);
} );