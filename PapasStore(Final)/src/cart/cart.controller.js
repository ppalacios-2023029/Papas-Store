import Cart from './cart.model.js'
import Product from '../Product/product.model.js'

export const addToCart = async (req, res) =>{
    try{
        const {userId, productId, quantity} = req.body
        const product = await Product.findById(productId)
        
        if(!product) return res.status(404).send(
            {
                success: false,
                message: 'Product not found'
            }
        )

        let cart = await Cart.findOne({user: userId})

        if(!cart) {
            cart = new Cart(
                {
                    user: userId,
                    products: [],
                    total: 0
                }
            )
        }

        const productInCar = cart.products.findIndex(
            (item) => item.product.toString() === productId
        )

        if(productInCar !== -1){
            cart.products[productInCar].quantity += quantity
        }else{
            cart.products.push({product: productId, quantity})
        }

        cart.total = cart.products.reduce((total, item) => {
            return total + (product.price * item.quantity)
        }, 0)

        await cart.save()

        return res.send(
            {
                success: true,
                message: 'Product add to cart',
                cart
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error in Cart'
            }
        )
    }
}

export const getCart = async (req, res) => {
    try {
        const { id } = req.params

        const cart = await Cart.findById(id)

        if (!cart) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Cart not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Cart found',
                cart
            }
        )

    }catch (e){
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

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body
        const { id } = req.params

        let cart = await Cart.findById(id).populate('products.product')

        if (!cart) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Cart not found'
                }
            )
        }

        cart.products = cart.products.filter(
            (item) => item.product._id.toString() !== productId
        )

        cart.total = cart.products.reduce((total, item) => {
            const product = item.product
            if (product && typeof product.price === 'number') {
                return total + (product.price * item.quantity)
            }
            return total; 
        }, 0)

        await cart.save()

        return res.send(
            {
                success: true,
                message: 'Product removed from cart',
                cart
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

export const clearCart = async (req, res) => {
    try {
        const { id } = req.params
        let cart = await Cart.findById(id)

        if(!cart) return res.send(
            {
                success: false,
                message: 'Cart not found'
            }
        )

        await Cart.deleteOne(cart)
        return res.send(
            {
                success: true,
                message: 'Cart Clear'
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