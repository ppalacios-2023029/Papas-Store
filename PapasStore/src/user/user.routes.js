import {Router} from 'express'
import {login, register, getAll, getUserId, upDate, deleteUser} from './user.controller.js'

const api = Router()

api.post('/register', register)
api.post('/login', login)
api.get('/getAll', getAll)
api.get('/getUserId/:id', getUserId)
api.put('/upDate/:id', upDate)
api.delete('/deleteUser/:id', deleteUser)

export default api