


const auth = require('./auth')
const productos = require('./productos')
const categorias = require('./categorias')
const usuarios = require('./usuarios')
const buscar = require('./buscar')

module.exports = {
    ...auth,
    ...productos,
    ...categorias,
    ...usuarios,
    ...buscar
}



