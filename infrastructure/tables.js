class Tables {
    init(connection){
        this.connection = connection;
        this.criarAtendimentos()
        this.createPets()
        console.log('Chamadas')
    }
    criarAtendimentos(){
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text,  PRIMARY KEY(id))'
        this.connection.query(sql, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log('Tabela ATENDIMENTOS criada com sucesso')
            }
        })
    }
    createPets(){
        const sql = 'CREATE TABLE IF NOT EXISTS pets (id INT NOT NULL AUTO_INCREMENT, nome VARCHAR(50) NOT NULL, imagem varchar(255), PRIMARY KEY (id))'
        this.connection.query(sql, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log('Tabela PETS criada com sucesso')
            }
        })
    }
}    
module.exports = new Tables;