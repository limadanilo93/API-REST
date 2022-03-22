module.exports = app =>{
    app.get('/atendimentos', (req, res) => res.send('Ambiente de atendimendos'));
    app.post('/atendimentos', (req, res) => {
        console.log(req.body)
        res.send('Você está ali ali e post')})
}