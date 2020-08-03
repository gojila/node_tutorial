const { response } = require("express");

function listAllDepartment(req, res){
    const { knex }  = req.app.locals;
    knex.select()
        .from('departments')
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error));
}

function listOneDepartment(req, res){
    const { knex }  = req.app.locals;
    const { id } = req.params;
    knex.select()
        .from('departments')
        .where({id: `$id`})
        .then(data => {
            if(data.length > 0){
                return res.status(200).json(data[0]);
            }
            else{
                return res.status(404).json(`Department with ID ${id} not found.`);
            }
            
        })
        .catch(error => res.status(500).json(error));
}

function createDepartment(req, res){
    const { knex }  = req.app.locals;
    const payload = req.body;
    const mandatoryColumns = ['name'];
    const payloadKeys = Object.keys(payload);
    const mandatoryExists = mandatoryColumns.every(mc => payloadKeys.includes(mc));
    if(mandatoryExists){
        knex('department')
        .insert(payload)
        .then(response => res.status(201).json(response))
        .catch(error => res.status(500).json(error));
    }
    else{
        return res.status(400).json(`Mandatory columns are require: ${mandatoryColumns}`);
    }
}

function updateDepartment(req, res){
    const { knex }  = req.app.locals;
    const { id } = req.params;
    const payload = req.body;

    const mandatoryColumns = ['name'];
    const payloadKeys = Object.keys(payload);
    const mandatoryExists = mandatoryColumns.every(mc => payloadKeys.includes(mc));
    if(mandatoryExists){
        knex('department')
        .where('id', id)
        .update(payload)
        .then(response => {
            if(response){
                return res.status(201).json(response);
            }
            else{
                return res.status(404).json(`Department with ID ${id} not found.`);
            }
            
        })
        .catch(error => res.status(500).json(error));
    }
    else{
        return res.status(400).json(`Mandatory columns are require: ${mandatoryColumns}`);
    }
}

function deleteDepartment(req, res){
    const { knex } = req.app.locals;
    const { id } = req.params;

    knex('department')
    .where('id', id)
    .del()
    .then(response => {
        if(response){
            return res.status(200).json(`Department with ID ${id} deleted.`);
        }
        else{
            return res.status(404).json(`Department with ID ${id} not found.`);
        }
    })
    .catch(error => res.status(500).json(error));
}

module.exports = {
    listAllDepartment,
    listOneDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment
}