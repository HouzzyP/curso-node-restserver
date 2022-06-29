const { Categoria, Producto } = require('../models')
const Role = require('../models/role')
const Usuario = require('../models/usuario')


const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        throw new Error(`El correo ${correo}, ya esta registrado`)

    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`El id no existe: ${id}`)
    }
}

const existeCategoriaPorId = async (id) => {
    try {
        const existeCategoria = await Categoria.findById(id)
        if (!existeCategoria) {
            throw new Error(`El id no existe: ${id}`)
        }
    } catch (err) {
        console.log(err)
        throw new Error(`El id no existe`)
    }

}

const existeProductoPorId = async (id) => {
    try {
        const existeProducto = await Producto.findById(id)
        if (!existeProducto) {
            throw new Error(`El id no existe: ${id}`)
        }
    } catch (err) {
        console.log(err)
        throw new Error('el id no existe')
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}