const { resolve } = require('path');
const Atendimento = require('../models/atendimento')
module.exports = app =>{
    app.get('/atendimentos', (req, res) => {
        
        Atendimento.lista()
            .then(results => res.json(results))
            .catch(err => res.status(400).json(err))
    });
    app.get('/atendimentos/:id', (req, res) => {
        console.log(req.params.id)
        const id = parseInt(req.params.id)
        Atendimento.findById(id, res)
    })
    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.adiciona(atendimento)
            .then((atendimentoCadastro) => {
                res.status(201).json(atendimentoCadastro)

            })
            .catch((err) => {
                res.status(400).json(err)
            })
        
    })
    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body
        Atendimento.update(id, values, res)
    })
    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.delete(id, res)
    })
}