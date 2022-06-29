const { Router } = require('express')
const { check } = require('express-validator')
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos')
const { existeProductoPorId } = require('../helpers/db-validators')
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')



const router = Router()




//Obtener todos las Productos - publico
router.get('/', obtenerProductos)

//Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un id ed Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto)

//Crear Productos - privado
router.post('/', [
    validarJWT,
    check('nombre', 'Nombre es obligatorio').not().isEmpty(),
    check('categoria', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    validarCampos
], crearProducto)

// Actualizar un producto - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto)

// Borrar un producto - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto)



module.exports = router