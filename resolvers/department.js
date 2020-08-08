const base = 'http://localhost:3000/api';
const fetch = require('node-fetch');
module.exports = {
    Query: {
        departments: async () => {
            return await fetch(`${base}/department`).then(response => response.json());
        },
        department: async (parent, { id }) => {
            return await fetch(`${base}/department/${id}`).then(response => response.json());
        }
    },
    Department: {
        employees: async parent => {
            return await fetch(`${base}/department/${parent.id}/employees`).then(response => {
                if(response.status != 200){
                    return [];
                }
                return response.json();
            });
        }
    }
};