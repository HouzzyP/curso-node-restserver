


const auth = require('./auth')
const productos = require('./productos')
const categorias = require('./categorias')
const usuarios = require('./usuarios')
const buscar = require('./buscar')
const uploads = require('./uploads')

module.exports = {
    ...auth,
    ...productos,
    ...categorias,
    ...usuarios,
    ...buscar,
    ...uploads
}



