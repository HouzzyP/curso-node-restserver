const { Router } = require('express')
const { check } = require('express-validator')
const { cargarArchivo, mostrarImagen, actualizarImagenCloudinary } = require('../controllers')
const { coleccionesPermitidas } = require('../helpers')


const { validarCampos, validarArchivoSubir } = require('../middlewares')


const router = Router()


router.get('/:coleccion/:id', [
    check('id', 'id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)


router.post('/', validarArchivoSubir, cargarArchivo)

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary)



module.exports = router