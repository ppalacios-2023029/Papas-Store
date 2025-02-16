import { validationResult } from "express-validator";

export const validateErrors = async(req, res, next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return next(errors)
    }
    next()
}