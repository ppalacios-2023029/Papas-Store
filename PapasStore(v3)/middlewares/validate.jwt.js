'use strict'

import jwt from 'jsonwebtoken'
import { findUser } from '../utils/db.validators.js'

export const validateJwt = async(req, res, next) =>{
    try{
        let secretKey = process.env.SECRET_KEY
        let {authorization} = req.headers
        if(!authorization) return res.status(401).send({message: 'Unauthorized'})

        let user = jwt.verify(authorization, secretKey)

        const validateUser = await findUser(user.uid)
        if(!validateUser) return res.status(404).send(
            {
                success: false,
                message: 'User not found - unauthorized'
            }
        )
        req.user = user
        next()
    }catch(e){
        console.error(e)
        return res.status(401).send({message: 'Invalid credentials'})
    }
}

export const isAdmin = async(req, res, next) =>{
    try{
        const {user} = req

        if(!user || user.role !== 'ADMIN') return res.status(403).send(
            {
                success: false,
                message: `You dont have access | username ${user.username}`
            }
        )
        next()
    }catch(e){
        console.error(e)
        return res.status(403).send(
            {
                success: false,
                message: 'Error with authorization'
            }
        )
    }
}

export const isUser = async(req, res, next) =>{
    try{
        const {user} = req

        if(!user || user.role !== 'CLIENTE') return res.status(403).send(
            {
                success: false,
                message: `You dont have access | username ${user.username}`
            }
        )
        next()
    }catch(e){
        console.error(e)
        return res.status(403).send(
            {
                success: false,
                message: 'Error with authorization'
            }
        )
    }
}