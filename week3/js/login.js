const pool_user = require('../config/config_user');
const mysql = require('mysql');



function login(req, res) {
    let password_input = req.body.password;
    let user_name_input = req.body.userName.toLowerCase();
    let user_reminders , user_lists , user_items , tags;
    const pool_user_connection  = mysql.createConnection( pool_user( user_name_input , password_input ) );

    const user_login  = ()=>{
        return new Promise( ( reslove , reject )=>{
            pool_user_connection.connect( ( err )=>{
                if( err ){
                    reject( err.code + ' : ' + err.status );
                }
                else{
                    reslove( 'connection successfully!' );
                }
            } );
        } );
    }

   user_login()

   .then( ()=>{
    pool_user_connection.query( 'select reminder , date from reminders where list_id IN ( select list_id from to_do_lists where user_name = ? )', [user_name_input] , (error , result)=>{
        if( error ){
    
            user_reminders = [{reminder:'Null' , date:'0000-00-00 00:00:00'}];
        }
        else{
            user_reminders = result;
        }
    } )
   } )


   .then( ()=>{
    pool_user_connection.query( 'select list_id , description from to_do_lists where user_name = ?', [user_name_input] , (error , result)=>{
        if( error ){
        
            user_lists = [{list_id:'0' , description:'Null'}];
        }
        else{
            user_lists = result;
        }
    } )
   } )


   .then( ()=>{
    pool_user_connection.query( "select item_id , description from items where list_id IN ( select list_id from to_do_lists where user_name = ? )" , [user_name_input] , (error , result)=>{
        if( error ){

            user_items = [{item_id:'0' , description:'Null'}];
        }
        else{
            user_items = result;
        }
    } )
   } )


   .then( ()=>{
    pool_user_connection.query( 'select tag_id , description from tags' , (error , result)=>{
        if( error ){

            tags = [{tag_id:'0' , description:'Null'}];
        }
        else{
            tags = result;

         
            
            
            res.render('user' , { user: user_name_input  ,
                reminders: user_reminders , lists: user_lists , items: user_items , tags: tags , config: JSON.stringify( pool_user( user_name_input , password_input )  )}); 

        }
    } )
   } )


   .catch( ()=>{

        console.log( 'Error signing!!' );

        pool_user_connection.end( (err , result)=>{
            if(err) console.log( 'Failed to disconnect!' ); 
        } );


        res.redirect( '/login' );

  } );

}


module.exports= login;
