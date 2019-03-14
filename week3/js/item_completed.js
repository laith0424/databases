const mysql = require('mysql');

async function item_completed(req, res) {
 
    let update_item_id = parseInt( req.body.update_item_id );
    let completed = req.body.completed == 'true' ? true : false;
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
    new_request_connection.query(  "UPDATE items SET completed = ? WHERE item_id = ?" , [ completed , update_item_id ] , ( err , result )=>{
        if( err ){
            console.log( 'The inserting failed' );
        }
        else{
            res.render('item_completed' , { password: user_config.password , user: user_config.user , result:'Successfully updated'} );
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

module.exports = item_completed;
