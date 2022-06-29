
const { Schema, model } = require('mongoose')

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, 'Estado es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

CategoriaSchema.methods.toJSON = function () {
    const { __v, estado, ...categoria } = this.toObject()

    if (categoria.usuario._id) {
        categoria.usuario.uid = categoria.usuario._id
        delete categoria.usuario._id
    }

    return categoria
}

module.exports = model('Categoria', CategoriaSchema)