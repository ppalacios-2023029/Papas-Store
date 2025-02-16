import { Schema, model } from "mongoose"

const productSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, 'Cant be overcome 25 characters']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxLength: [50]
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Product', productSchema)