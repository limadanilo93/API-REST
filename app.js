const customExpress = require('./config/customExpress');
const connection = require('./infrastructure/database/connections')
const Tables = require('./infrastructure/database/tables')
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
