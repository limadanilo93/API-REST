const { resolve } = require('path');
const Atendimento = require('../models/atendimento')
module.exports = app =>{
    app.get('/atendimentos', (req, res) => {
        
        Atendimento.lista(res)
    });
    app.get('/atendimentos/:id', (req, res) => {
        console.log(req.params.id)
        const id = parseInt(req.params.id)
        Atendimento.findById(id, res)
    })
    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.adiciona(atendimento, res)
        
    })
    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body
        Atendimento.update(id, values, res)
    })
    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body
        Atendimento.update(id, values, res)
    })
}