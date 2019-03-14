const mysql = require('mysql');

async function delete_an_item(req, res) {
    let delete_item_id = parseInt( req.body.delete_item_id );
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
    new_request_connection.query( 'DELETE FROM items_tags WHERE item_id = ?' , [delete_item_id] , ( err , result )=>{
        if( err ){
            console.log( 'The delete failed' );
            
        }
    } )
  } )

  .then( ()=>{
    new_request_connection.query( 'DELETE FROM items WHERE item_id = ?' , [delete_item_id] , ( err , result )=>{
        if( err ){
            console.log( 'The delete failed' );
          
        }
        else{
            res.render('delete_an_item' , { password: user_config.password , user: user_config.user , result:'Successfully deleted'} );
        }
    } )
  } )


  .catch( ()=>{
    new_request_connection.end( (err , result)=>{
        if(err) console.log( 'Failed to disconnect!' );
        
        res.redirect( '/login' );

    } );
  } )
    

}

module.exports = delete_an_item;