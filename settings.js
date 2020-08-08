// const APIServerPort = 3000;

// const database = {
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '123456',
//     database: 'test_node_db'
// };

const APIServerPort = process.env.API_SERVER_PORT;

const database = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

module.exports = {
    database,
    APIServerPort
};