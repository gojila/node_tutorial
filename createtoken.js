const setting = require('./settings');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');

const knex = require('knex')({
    client: 'mysql',
    connection: setting.database
});

const username = 'adam';
const password = 'password';

knex('users').where({
    username
}).then(response => {
    bcrypt.compare(password, response[0].password, (error, result) =>{
        if(result){
            console.log('Authentication successful');
            const payload = {
                username: 'adam',
                isAdmin: true
            };
            //const secret = 's3cr3t';
            const secret = process.env.JWT_SECRET;
            const expiresIn = 3600;
            const token = jwt.sign(payload, secret, { expiresIn });
            console.log(token);
        }
        else{
            console.log('Incorrect password');
        }
    });
});