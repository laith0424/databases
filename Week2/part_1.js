
const mysql = require('mysql');
const fs = require('fs');  
const capitalCountry =       fs.readFileSync( 'queries/query_1.txt' , 'utf8' ) ;
const listLanguages =        fs.readFileSync( 'queries/query_2.txt' , 'utf8' ) ;
const countCities =          fs.readFileSync( 'queries/query_3.txt' , 'utf8' ) ;
const countriesSameRegion =  fs.readFileSync( 'queries/query_4.txt' , 'utf8' ) ;
const ListContinents =       fs.readFileSync( 'queries/query_5.txt' , 'utf8' ) ;
const helpFile =             fs.readFileSync( 'queries/help.txt' , 'utf8' ) ;


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
        reject( err.code + ' : ' + err.status );
      }
      else{
        resolve('connection successfully!');
      }
     
    });

  } ) ;
}


createSelect(  )
   
   .then( function( status ){

     if(process.argv[2] == '5' ){
      console.log( status )
      con.query(  ListContinents ,  function(err , result){

        if(err) { console.log( err.code + ' : ' + err.status );}
       
        console.log( result); } );
     } else {
        switch( process.argv[2] ){
          case '1':
             executeQuery( capitalCountry , process.argv[3] , status );
             break;
          case '2':
             executeQuery( listLanguages , process.argv[3] , status );
             break;
          case '3':
             executeQuery( countCities , process.argv[3] , status);
             break;
          case '4':
             executeQuery( `call p_similar_countries('${process.argv[3]}');` ,  status );
             break;
          default:
             console.log(helpFile);

        }
      }
     
      

   } )
   .then( function(){
        con.end( function(err , result){
        if(err) console.log( err.code + ' : ' + err.status );} );} )
     
      

.catch( function( status ){
  console.log(status);
 
    con.end( function(err , result){
      if(err) console.log(err.code + ' : ' + err.status);} );
  
  
} );



function executeQuery(query , value , status ) {
  console.log( status )
      con.query(  query , value , function(err , result){

        if(err) { console.log( err.code + ' : ' + err.status );}
       
        console.log( result); } );
}