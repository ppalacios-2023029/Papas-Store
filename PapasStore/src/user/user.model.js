import { Schema, model } from "mongoose"

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            MaxLength: [25, 'Cant be overcome 25 characters']
        },
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            MaxLength: [25, `Can't be overcome 25 characters`]
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: [true, 'Username is already taken'],
            MaxLength: [15, `Can't be overcome 15 characters`]
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: [8, 'Password must be 8 characters']
        },
        phone: {
            type: String,
            required: true,
            minLength: [8, 'Cant be overcome 8 characters'],
            MaxLength: [15, 'Phone must be 15 nombers']
        },
        role: {
            type: String,
            uppercase: true,
            enum: ['ADMIN', 'CLIENTE'],
            default: 'CLIENTE'
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
       
)

userSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject() //Sirve para convertir un documento de MongoDB a Objeto de JS
    return user
}

export default model('User', userSchema)