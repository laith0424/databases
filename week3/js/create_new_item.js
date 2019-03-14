const mysql = require('mysql');

async function create_new_item(req, res) {
    let select_tag_id =  parseInt( req.body.select_tag_id );
    let select_list_id = parseInt( req.body.select_list_id );
    let due_date = req.body.due_date;
    let todo_description = req.body.todo_description;
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
    new_request_connection.query(  "INSERT INTO items ( list_id, description , due_date) VALUES ( ? , ? , ?  )" , [ select_list_id , todo_description , due_date  ] , ( err , result )=>{
        if( err ){
            console.log( 'The inserting failed' );
        }
    } );
  } ) 

  .then( ()=>{
    new_request_connection.query(  "INSERT INTO items_tags ( item_id , tag_id ) VALUES ( ( SELECT LAST_INSERT_ID() ) ,  ? )" , [select_tag_id] , ( err , result )=>{
        if( err ){
            console.log( 'The inserting failed' );
        }
        else{
            res.render('create_new_item' , { password: user_config.password , user: user_config.user , result:'Successfully created'} );
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

module.exports = create_new_item;
