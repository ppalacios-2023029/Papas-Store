import {Router} from 'express'
import {login, register, getAll, getUserId, upDate, deleteUser} from './user.controller.js'
import { isAdmin, validateJwt, isUser } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/register', register)
api.post('/login', login)
api.get('/getAll', [validateJwt, isAdmin] ,getAll)
api.get('/getUserId/:id', [validateJwt, isAdmin] ,getUserId)
api.put('/upDate/:id', [validateJwt, isUser] ,upDate)
api.delete('/deleteUser/:id', [validateJwt, isUser] ,deleteUser)

export default api