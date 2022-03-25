const connection = require('../infrastructure/connections')
const fileUpload = require('../files/fileUpload')
class Pet {
    adiciona(pet, res){
        const sql = 'INSERT INTO pets SET ? '      
        fileUpload(pet.imagem, pet.nome, (err, newPath)=>{
            if (err){
                res.status(400).json(err);
            }
            else {
                const newPet = {nome: pet.nome, imagem: newPath}
                
                connection.query(sql, newPet, (err) => {
                    if (err) {
                        console.log(err)
                        res.status(400).json(err)
                    }
                    else {
                        res.status(200).json(newPet)
                    }
                })
                
            }
           
        })
        
    }
}
module.exports = new Pet();
