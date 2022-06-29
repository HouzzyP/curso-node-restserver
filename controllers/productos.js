const { response, request } = require("express");
const { Producto } = require('../models')


//obtenerProductos - paginado - total - populate

const obtenerProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    //Promise.all para ejecutar las promesas al mismo tiempo.
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('categoria', 'nombre')
            .populate('usuario', 'nombre')

    ])

    res.json({
        total,
        productos
    })

}

//obtenerProducto - populate {}
const obtenerProducto = async (req = request, res = response) => {

    const { id } = req.params
    const producto = await Producto
        .findById(id)
        .populate('categoria', 'nombre')
        .populate('usuario', 'nombre')

    if (!producto.estado) {
        return res.json({
            msg: 'El id para este producto se encuentra borrada'
        })
    }
    res.json(producto)

}

const crearProducto = async (req, res = response) => {

    const { estado, usuario, ...body } = req.body

    const productoDB = await Producto.findOne({ nombre: body.nombre })


    //Verificar si existe en la DB 
    if (productoDB) {
        return res.status(400).json({
            msg: `La categoria ${productoDB.nombre} ya existe`
        })
    }

    //Generar la data a guardar

    const data = {
        ...body,
        usuario: req.usuario._id,
        nombre: body.nombre.toUpperCase(),


    }

    const producto = new Producto(data)

    //guardar en DB
    await producto.save()

    res.status(201).json(producto)

}

//actualizarProducto por nombre
const actualizarProducto = async (req, res = response) => {

    const { estado, usuario, ...data } = req.body
    const { id } = req.params

    const existeNombre = await Producto.findOne({ nombre: data.nombre })
    if (existeNombre) {
        return res.json({
            msg: `Ya existe un producto con el nombre ${nombre}`
        })
    }
    data.usuario = req.usuario._id


    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })


    res.json(producto)


}

//borrarProducto - estado : false 
const borrarProducto = async (req, res = response) => {
    const { id } = req.params

    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })

    res.status(200).json(producto)
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}