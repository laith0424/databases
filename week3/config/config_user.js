
function pool_user( user , password ){
    return {
        host: 'localhost',
        user: user,
        password: password,
        database: 'todo'
    };
}

module.exports = pool_user;

