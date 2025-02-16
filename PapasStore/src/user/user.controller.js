import User from './user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypts.js'
import { generateJwt } from '../../utils/jwt.js'

export const test = (req, res) =>{
    console.log('Test is running')
    res.send({message: 'Test is running'})
}

export const register = async(req, res) =>{
    try{
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        await user.save()
        return res.send({message: `Register user with ${user.username}`})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error', e})
    }
}

export const login = async(req, res) =>{
    try{
            let {userLoggin, password} = req.body
            let user = await User.findOne(
            {
                $or: [
                    {username: userLoggin},
                    {email: userLoggin}
                ]
            }
        )
        console.log(user)

        if(user && await checkPassword(user.password, password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.username}`,
                    loggedUser,
                    token
                }
            )
        }
            return res.status(400).send({message: 'Invalid credetials'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error', e})
    }
    
}

export const getAll = async(req, res) =>{
    try{
        const {limit = 20, skip = 0} = req.query
        const users = await User.find()
            .skip(skip)
            .limit(limit)

        if(users.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Users not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Users Found: ',
                users
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error',e})
    }
}

export const getUserId = async(req, res) =>{
    try{
        let {id} = req.params
        let user = await User.findById(id)

        if(!user) return res.satatus(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User found: ',
                user
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                e
            }
        )
    }
}

export const upDate = async(req, res) =>{
    try{
        const {id} = req.params
        const data = req.body

        const update = await User.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated',
                user: update
            }
        )
    }catch(e){
        console.error('General Error',e)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                e
            }
        )
    }
}

export const deleteUser = async(req, res) =>{
    try{
        let {id} = req.params
        let user = await User.findById(id)

        if(!user) return res.send({message: 'User dont found'})

        await User.deleteOne(user)
        return res.send({message: 'User deleted'})
    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                e
            }
        )
    }
}