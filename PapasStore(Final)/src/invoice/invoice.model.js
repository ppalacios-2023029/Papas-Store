import { Schema, model } from "mongoose";

const invoiceSchema = Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User', 
            required: true
        },
        cart: {
            type: Schema.Types.ObjectId,
            ref: 'Cart', 
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
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ],
        total: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model('Invoice', invoiceSchema);