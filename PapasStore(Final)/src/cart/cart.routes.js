import { Router } from "express"
import { validateJwt, isUser } from "../../middlewares/validate.jwt.js"
import { addToCart, clearCart, getCart, removeFromCart } from "./cart.controller.js"

const api = Router()

api.post('/addToCart', [validateJwt, isUser], addToCart)
api.get('/getCart/:id', [validateJwt, isUser], getCart)
api.delete('/removeFromCart/:id', [validateJwt, isUser], removeFromCart)
api.delete('/clearCart/:id', [validateJwt, isUser], clearCart)

export default api