import { Router } from "express"
import { validateJwt, isUser } from "../../middlewares/validate.jwt.js"
import { generateInvoice, getInvoiceById, getInvoiceByUser } from "./invoice.controller.js"

const api = Router()

api.post('/generateInvoice', [validateJwt, isUser], generateInvoice)
api.get('/getInvoiceByUser/:userid', [validateJwt, isUser], getInvoiceByUser)
api.get('/getInvoiceById/:invoiceId', [validateJwt, isUser], getInvoiceById)

export default api