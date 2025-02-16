import {Router} from 'express'
import {addProduct, getAll, getProduct, updateProd, deleteProd} from './product.controller.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/addProduct', [validateJwt, isAdmin], addProduct)
api.get('/getAll', getAll)
api.get('/getProduct/:id', getProduct)
api.put('/updateProd/:id', [validateJwt, isAdmin],updateProd)
api.delete('/deleteProd/:id', [validateJwt, isAdmin],deleteProd)

export default api

