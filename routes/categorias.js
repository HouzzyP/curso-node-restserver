const { Router } = require('express')
const { check } = require('express-validator')
const { crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
} = require('../controllers/categorias')
const { existeCategoriaPorId } = require('../helpers/db-validators')
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')



const router = Router()


/**
 * {{url}}/api/categorias
 */

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias)

//Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id ed Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria)

//Crear Categoria - privado
router.post('/', [
    validarJWT,
    check('nombre', 'Nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

//Actualizar una categoria - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria)

//Borrar categoria - Admin 
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria)



module.exports = router