const express = require('express');
const app = express();
const port = 3000;
const settings = require('./settings');
const router = express.Router();
const routes = require('./routes');
//const mysql = require('mysql');
//const connection = mysql.createConnection(settings.database);
const middlewares = require('./middlewares');
const schema = require('./schema');
const resolvers = require('./resolvers');

const { ApolloServer } = require('apollo-server-express');
const server = new  ApolloServer({
    typeDefs: schema,
    resolvers: resolvers
});
server.applyMiddleware({ app });

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const knex = require('knex')({
    client: 'mysql',
    connection: settings.database
});
app.locals.knex = knex;

//app.get('/api/employees', (req, res) => res.send('Hello World!'));
//app.post('/api/employees', (req, res) => res.send('HTTP POST in action'));
//app.all('/api/employees', (req, res) => res.send(`${req.method} in action`));
// app.route('/api/employees')
//     .get((req, res) => res.send('GET'))
//     .post((req, res) => res.send('POST'));

// router.get('/employees/:id', (req, res) => {
//     console.log(req.params);
//     return res.send('Hello world!');
// });

router.get('/employees', routes.employees.listAllEmployee);
//router.get('/employees/:id', middlewares.authenticate, middlewares.getIDAsInteger, routes.employees.listOneEmployee);
router.get('/employees/:id', middlewares.getIDAsInteger, routes.employees.listOneEmployee);
router.post('/employees', jsonParser, routes.employees.createEmployee);
router.patch('/employees/:id', jsonParser, middlewares.getIDAsInteger, routes.employees.updateEmployee);
router.delete('/employees/:id', middlewares.getIDAsInteger, routes.employees.deleteEmployee);

router.get('/department', routes.department.listAllDepartment);
router.get('/department/:id', middlewares.getIDAsInteger, routes.department.listOneDepartment);
router.get('/department/:id/employees', middlewares.getIDAsInteger, routes.department.getDepartmentEmployees);
router.post('/department', jsonParser, routes.department.createDepartment);
router.patch('/department/:id', jsonParser, middlewares.getIDAsInteger, routes.department.updateDepartment);
router.delete('/department/:id', middlewares.getIDAsInteger, routes.department.deleteDepartment);

app.use('/api', router);

// connection.connect(error => {
//     if(error){
//         console.error('Error connection to database: ', error);
//         return process.exit();
//     }
//     app.locals.connection = connection;
// });
app.listen(settings.APIServerPort, () => console.info(`Server is listening on ${settings.APIServerPort}`));


