const fs = require('fs')
const path = require('path')
module.exports = (patha, name, imgCreated) => {
    const ext = path.extname(patha)
    const validExt = ['jpg', 'png', 'jpeg', 'webp', 'gif']
    const isValid = validExt.indexOf(ext.substring(1)) !== -1
    if (isValid) {
        const newPath = `./assets/img/new/${name}${ext}`
        fs.createReadStream(patha)
        .pipe(fs.createWriteStream(newPath))
        .on('finish', ()=> imgCreated(false, newPath))
    }
    else {
        const err = 'Erro de eextensão'
        console.error('Erro - extensão inválida')
        imgCreated(err)
    }


}

