const mysql = require('mysql');

 function creat_new_list(req, res) {
    let todo_description_input = req.body.todo_description;
    let user_name_input = req.body.user_name;
    let user_config = JSON.parse( req.body.user_config );
      
  
  const new_request_connection =  mysql.createConnection( user_config );
  
  const new_list = ()=>{
      return new Promise( ( resolve , reject )=>{
        new_request_connection.connect( (err)=>{
              if( err ){
                  reject( err.code + ' : ' + err.status   );
              }
              else{
                  resolve( 'connection successfully!' );
              }
          } );
      } );
  }

  new_list()

  .then( ()=>{
    new_request_connection.query(  "INSERT INTO to_do_lists ( user_name , description) VALUES (  ? , ? )" , [user_name_input , todo_description_input ] , ( err , result )=>{
        if( err ){
            console.log( 'The inserting failed' );
        }
        else{
          res.render('creat_new_list' , { password: user_config.password , user: user_config.user , result:'Successfully created'} );
        }
    } );
  } ) 

  .catch( ()=>{
    new_request_connection.end( (err , result)=>{
        if(err) console.log( 'Failed to disconnect!' );
        
        res.redirect( '/login' );

    } );
  } )
              

}



module.exports = creat_new_list;
