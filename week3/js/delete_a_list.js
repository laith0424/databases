const mysql = require('mysql');

async function delete_a_list(req, res) {
    let delete_user_name = req.body.delete_user_name;
    let delete_list_id =  parseInt( req.body.delete_list_id );
    let user_config = JSON.parse( req.body.user_config );


    const new_request_connection =  mysql.createConnection( user_config );

  const delete_list = ()=>{
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

  delete_list()
  .then( ()=>{
    new_request_connection.query( 'DELETE FROM items_tags WHERE item_id IN ( SELECT item_id FROM  items WHERE list_id = ? )' , [delete_list_id] , ( err , result )=>{
        if( err ){
            console.log( 'The delete failed' );
            //res.redirect( '/login' );
        }
    } )
  } )

  .then( ()=>{
    new_request_connection.query( 'DELETE FROM items WHERE list_id = ?' , [delete_list_id] , ( err , result )=>{
        if( err ){
            console.log( 'The delete failed' );
          //  res.redirect( '/login' );
        }
    } )
  } )

  .then( ()=>{
    new_request_connection.query(  "DELETE FROM to_do_lists WHERE list_id = ?" , [delete_list_id] , ( err , result )=>{
        if( err ){
            console.log( 'The delete failed' );
        }
        else{
          res.render('delete_a_list' , { password: user_config.password , user: user_config.user , result:'Successfully deleted'} );
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

module.exports = delete_a_list;
