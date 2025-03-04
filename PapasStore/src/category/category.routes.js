import { Router } from "express"
import {validateJwt, isAdmin} from '../../middlewares/validate.jwt.js'
import { deleteCat, getAll, getCat, registerCat, upDate } from "./category.controller.js"

const api = Router()

api.post('/registerCat', [validateJwt, isAdmin], registerCat)
api.get('/getAll', [validateJwt] ,getAll)
api.get('/getCat/:id', [validateJwt, isAdmin] ,getCat)
api.put('/upDate/:id', [validateJwt, isAdmin], upDate)
api.delete('/deleteCat' [validateJwt, isAdmin], deleteCat)

export default api