const { createSecretKey } = require('crypto');
const moment = require('moment');
const axios = require ('axios')
const connection = require('../infrastructure/connections');
const atendimentos = require('../controllers/atendimentos');


class Atendimento {
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD-MM-YYYY').format('YYYY-MM-DD HH:MM:SS');
        const ehValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido =atendimento.cliente.length >= 5
        const validacoes =[
            {   name: 'data',
                valido: ehValida,
                msg: 'Data deve ser igual ou posterior a hoje' 
            },
            {   name: 'cliente',
                valido: clienteValido,
                msg: 'Cliente deve ter mais de 5 letras'
            }
        ]
        const erros = validacoes.filter(campo => !campo.valido)
        const existeErros = erros.length
        if (existeErros){
            res.status(400).json(erros)
        }
        else {
            const atendimentoData = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO atendimentos SET ? ';
    
            connection.query(sql, atendimentoData, (error, result) => {
                if (error) {
                    res.status(400).json(error);
                }
                else {
                    res.status(201).json(`O atendimento de ${atendimento.servico} foi cadastrado para o cliente ${atendimento.cliente}, para a data ${atendimento.data}`)
                }
            })
        }
        
    }
    lista(res){
        const sql = 'SELECT * FROM atendimentos'
        connection.query(sql, (err, result) => {
            if (err) {
                res.status(400).json(err)
            }
            else {
                res.status(200).json(result)
            }
        })
    }
    findById(id, res){
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`
        
        connection.query(sql, async (err, result) => {
            const a = result[0];
            const cpf = a.cliente
            if (err) {
                res.status(400).json(err)
            }
            else{
                const {data} = await axios.get(`http://localhost:8082/${cpf}`)
                a.cliente = data
                res.status(200).json(a)
            }
        })
    }
    update(id, values, res){
        if (values.data){
            values.data = moment(values.data, 'DD-MM-YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = 'UPDATE atendimentos SET ? WHERE id=?'
        connection.query(sql,[values,id], (err, result) => {
            if (err) {
                res.status(400).json(err)
            }
            else{
                res.status(200).json({...values, id})
            }
        })
    }
    delete(id, res){
        const sql = 'DELETE FROM atendimentos WHERE id=?'
        connection.query(sql,id, (err, result) => {
            if (err) {
                res.status(400).json(err)
            }
            else{
                res.status(200).json(`Id removido: ${id}`)
            }
        })
    }
}
module.exports = new Atendimento;