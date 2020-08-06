const base = 'http://localhost:3000/api';
const fetch = require('node-fetch');
module.exports = {
    Query: {
        employees: async () => {
            return await fetch(`${base}/employees`).then(response => response.json());
        },
        employee: async (parent, { id }) => {
            return await fetch(`${base}/employees/${id}`).then(response => response.json());
        }
    },
    Employee: {
        department: async parent => {
            return await fetch(`${base}/department/${parent.department}`).then(response => response.json());
        }
    }
};