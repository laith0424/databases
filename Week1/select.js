
const mysql = require('mysql');
const fs = require('fs');  
const newQuery =  JSON.parse( fs.readFileSync( 'select.json' , 'utf8' ) );



const con =  mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345',
  database: 'world'
});



let createSelect = function ( ){
  
  return new Promise( function( resolve , reject ){
   
    con.connect(function(err) {

      if (err) {
        reject( 'failed connection!' );
      }
      else{
        console.log("Connected successfully!");
        resolve('created successfully!');

      }
     
    });

  } ) ;
}


createSelect(  )
   
   .then( function(){
     if( process.argv.length > 2 ){

      con.query( newQuery[ parseInt(process.argv[2]) -1 ]['query']  , function(err , result){

        if(err) { console.log('failed! Query!');
            helpFile();}
        console.log( result); } );
     }
     else {
      helpFile();
     }

   } )
   .then( function(){
        con.end( function(err , result){
        if(err) console.log('failed!');} );} )
        .then( function(){} )
      

.catch( function( status ){
  console.log(status);
} );



function helpFile(){

  fs.readFile('help.txt', 'utf8', function (err, data) {
    if(err){
      console.log("err");
    }
    else{
      console.log( data );
    }
   });

 }