const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        employees: [Employee],
        employee(id: Int): Employee
    }

    type Employee {
        id: Int,
        name: String,
        email: String,
        address: String,
        department: Department
    }
`;