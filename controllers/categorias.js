const { response, request } = require("express");
const { Categoria } = require('../models')


//obtenerCategorias - paginado - total - populate

const obtenerCategorias = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    //Promise.all para ejecutar las promesas al mismo tiempo.
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')

    ])

    res.json({
        total,
        categorias
    })

}

//obtenerCategoria - populate {}
const obtenerCategoria = async (req = request, res = response) => {

    const { id } = req.params

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre')

    if (!categoria.estado) {
        return res.json({
            msg: 'El id para esta categoria se encuentra borrada'
        })
    }
    res.json(categoria)

}

const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({ nombre })


    //Verificar si existe en la DB 
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }

    //Generar la data a guardar

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)

    //guardar en DB
    await categoria.save()

    res.status(201).json(categoria)

}

//actualizarCategoria por nombre
const actualizarCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase()
    const { id } = req.params

    const existeNombre = await Categoria.findOne({ nombre })
    if (existeNombre) {
        return res.json({
            msg: `Ya existe una categoria con el nombre ${nombre}`
        })
    }
    console.log(nombre)

    const categoria = await Categoria.findByIdAndUpdate(id, { nombre }, { new: true })


    res.json(categoria)


}

//borrarCategoria - estado : false 
const borrarCategoria = async (req, res = response) => {
    const { id } = req.params

    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true })

    res.status(200).json(categoria)
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}