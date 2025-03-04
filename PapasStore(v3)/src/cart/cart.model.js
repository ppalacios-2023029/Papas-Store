import { Schema, model } from "mongoose";

const cartSchema = Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User', 
            required: true
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product', 
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
            }
        ],
        total: {
            type: Number,
            default: 0
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model('Cart', cartSchema);