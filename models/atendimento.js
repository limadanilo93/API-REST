const { createSecretKey } = require('crypto');
const moment = require('moment');
const axios = require ('axios')
const connection = require('../infrastructure/database/connections');
const atendimentos = require('../controllers/atendimentos');
const repository = require('../repositories/atendimento')


class Atendimento {
    constructor()  {
        this.ehValida = ({data, dataCriacao})=> moment(data).isSameOrAfter(dataCriacao)
        this.clienteValido = (tamanho)=> tamanho >= 5
        this.valida = (params)=>{
            this.validacoes.filter(campo => {
                const {nome} = campo
                const {param} = params[nome]

                return !campo.valido(param)
            })
        }

        this.validacoes =[
            {   name: 'data',
                valido: this.ehValida,
                msg: 'Data deve ser igual ou posterior a hoje' 
            },
            {   name: 'cliente',
                valido: this.clienteValido,
                msg: 'Cliente deve ter mais de 5 letras'
            }
        ]
        
        
    }
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD-MM-YYYY').format('YYYY-MM-DD HH:MM:SS');
        
        const params = {
            data: {data, dataCriacao},
            cliente: {tamanho: atendimento.cliente.length}
        }
        const erros = this.valida(params)
        const existeErros = erros.length
        if (existeErros){
            return new Promise((resolve, reject) => {
                reject(erros)
            })
        }
        else {
            const atendimentoData = {...atendimento, dataCriacao, data}
            
            return repository.adiciona(atendimentoData)
                .then((results) => {
                    const id = results.insertId
                    return {...atendimento, id}
                })
         
        }
        
    }
    lista(){
        return repository.lista()
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