const customExpress = require('./config/customExpress');
const connection = require('./infrastructure/connections')
const Tables = require('./infrastructure/tables')
connection.connect(error => {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Banco de Dados conectado')
        
        Tables.init(connection)
        const app = customExpress()
        app.listen(3000, () => console.log('Server on port 3000'));
    }
})
