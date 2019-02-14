  
/*
------MYSQL CODE :

DROP  PROCEDURE  IF EXISTS `lp_language_INSERT`;
DELIMITER $$
CREATE  PROCEDURE `lp_language_INSERT`(
        in  p_countryID                     CHAR(3)     , 
        in  p_language                      CHAR(30)    ,
        in  p_official                      CHAR(1)     ,
        in  p_percentage                    FLOAT(4,1)
     )
BEGIN 
   
  DECLARE countLanguage INT;
    
	START TRANSACTION;
    
    INSERT INTO countrylanguage
         (
           CountryCode                       , 
           Language                          , 
           IsOfficial                        ,
           Percentage
         )
    VALUES 
         ( 
           p_countryID                     , 
           p_language                      , 
           p_official                      ,
           p_percentage
         ) ;

      COMMIT;
      
      SELECT  count(language) INTO countLanguage FROM countrylanguage WHERE countrycode = p_countryID ;

      IF countLanguage  = 10
       THEN
         SELECT 'There is  10 languages now' AS Alert;
      END IF;
END$$
DELIMITER ;



DROP TRIGGER IF EXISTS `insert_trigger_countrylanguage`;

DELIMITER //

CREATE TRIGGER insert_trigger_countrylanguage

 AFTER INSERT 

 ON countrylanguage FOR EACH ROW 

 BEGIN   

   IF (  SELECT count(language)  
         FROM   countrylanguage  
         WHERE  countrycode = NEW.countrycode   
      ) > 10  
   THEN
       SIGNAL SQLSTATE '23522'
       SET message_text = 'More than 10 languages for each country not allowed';
   END IF;

 END//
DELIMITER ;



*/



const mysql = require('mysql');
const con =  mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345',
  database: 'world'
});



let createInsert = function ( ){
  
  return new Promise( function( resolve , reject ){
   
    con.connect(function(err) {

      if (err) {
        reject( ' The connection failed! '  );
      }
      else{
        resolve('Connected successfully!');

     
      }
     
    });


  } ) ;
}


createInsert( ) 
   .then( function( res ){
     
    console.log( res );

    con.query( "CALL lp_language_INSERT ('AGO' , 'Arabic' , 'F' , 0.7 );"  , function(err , result){
      if(err)  
         throw err.message;   
      console.log(  'Successfully inserted!'  );
      console.log(  result[0][0].Alert ); 
     } );

    

   } )

   .then( function(){

    con.end( function(err){
        if(err) console.log(' Failed to disconnect!'  );
                          
      } );} )
              

.catch( function( status ){
  console.log(status);
} );