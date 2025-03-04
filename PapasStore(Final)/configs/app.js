'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { limiter } from '../middlewares/rate.limit.js'
import userRouter from '../src/user/user.routes.js'
import categoryRouter from '../src/category/category.routes.js'
import productRouter from '../src/Product/product.routes.js'
import cartRouter from '../src/cart/cart.routes.js'
import invoiceRouter from '../src/invoice/invoice.routes.js'

const configs = (app) =>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes = (app) =>{
    app.use('/user', userRouter)
    app.use('/category', categoryRouter)
    app.use('/product', productRouter)
    app.use('/cart', cartRouter)
    app.use('/invoice', invoiceRouter)
}


export const initServer = () =>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(e){
        console.error('Server init failed')
    }
}