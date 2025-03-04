import { Schema, model } from "mongoose"

const categorySchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [50, 'Cant be overcome 25 characters']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxLength: [50]
        }
    },
    {
        versionKey: false, 
        timestamps: true
    }
)

export default model('Category', categorySchema)