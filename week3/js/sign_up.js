
var root_connection = require('../config/config_root');

function sign_up(req, res) {
    var password_input = req.body.password;
    var user_name_input = req.body.userName.toLowerCase();
    var first_name_input = req.body.firstName;
    var last_name_input = req.body.lastName;
    var email_input = req.body.email;



const pool_root = function()  {
    return new Promise( (reslove , reject)=> {
        root_connection.connect( ( err )=>{
            if( err ){
                reject( err.code + ' : ' + err.status );
            }
            else{
                reslove('connection successfully!');
            }
        } )
    });
} 


    pool_root()
    
    .then( ()=>{  //   CREATE USER 
        root_connection.query( "create user if not exists ?@localhost identified by ?" , [ user_name_input , password_input ] , ( err , result )=>{
            if(err){
                res.render( 'sign_up' );
            }
        } );
    } )

    .then( ()=>{
        root_connection.query( "ALTER USER ?@'localhost' IDENTIFIED WITH mysql_native_password BY ?" , [ user_name_input , password_input ]  , ( err , result )=>{
            if( err ){
                console.log( 'Wrong modification' );
            }
        } );
    } )

    //        INSERT THE USER  IN THE DB         //
    .then( ()=>{
        root_connection.query( "insert into users ( first_name , last_name , user_name , e_mail ) values( ? , ? , ? , ? )" , [ first_name_input , last_name_input , user_name_input , email_input ] , ( err , result )=>{
            if( err ){
                console.log( 'The inserting failed' );
            }
        } );
    } )


    //           GRANT THE USER         //
    .then( ()=>{   
        root_connection.query( "grant insert , select , update , delete on  todo.to_do_lists  to ?@localhost" , user_name_input  , ( err , result )=>{
            if( err ){
                console.log( 'The grant failed' );
            }
        } );
    } )

    .then( ()=>{
        root_connection.query( "grant insert , select , update , delete on  todo.items  to ?@localhost" , user_name_input , ( err , result )=>{
            if( err ){
                console.log( 'The grant failed' );
            }
        } );
    } )

    .then( ()=>{
        root_connection.query(  "grant insert , select , update , delete on  todo.tags  to ?@localhost" , user_name_input , ( err , result )=>{
            if( err ){
                console.log( 'The grant failed' );
            }
        } );
    } )

    .then( ()=>{
        root_connection.query( "grant insert , select , update , delete on  todo.items_tags  to ?@localhost" , user_name_input , ( err , result )=>{
            if( err ){
                console.log( 'The grant failed' );
            }
        } );
    } )

    .then( ()=>{
        root_connection.query( "grant insert , select , update , delete on  todo.reminders  to ?@localhost" , user_name_input , ( err , result )=>{
            if( err ){
                console.log( 'The grant failed' );
            }
        } );
    } )

    .then( ()=>{
        root_connection.query( "GRANT TRIGGER ON todo.items TO ?@'localhost'" , user_name_input , ( err , result )=>{
            if( err ){
                console.log( 'The grant failed' );
            }
        } );
    } )

    .then( ()=>{
        root_connection.end( (err , result)=>{
            if(err) console.log( 'Failed to disconnect!' );
        } );

        res.render('signing' , { password: password_input , user: user_name_input} ); 
    } )

   
    .catch( function( ){

        console.log( 'Error signing!!' );

        root_connection.end( (err , result)=>{
            if(err) console.log( 'Failed to disconnect!' );
        } );

        res.render( 'sign_up' );

      } );

}

module.exports = sign_up;