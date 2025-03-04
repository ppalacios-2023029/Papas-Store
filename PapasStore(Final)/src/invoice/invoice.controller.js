import Invoice from './invoice.model.js'
import Cart from '../cart/cart.model.js'
import Product from '../Product/product.model.js'

export const generateInvoice = async (req, res) => {
    try {
        const { cartId } = req.body;
        const cart = await Cart.findById(cartId).populate('products.product');

        if (!cart) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Cart not found'
                }
            )
        }

        if (cart.products.length === 0) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'Cart is empty'
                }
            )
        }

        const invoice = new Invoice(
            {
                user: cart.user,
                cart: cart._id,
                products: cart.products.map(item => (
                        {
                            product: item.product._id,
                            quantity: item.quantity,
                            price: item.product.price
                        }
                    )
                ),
                total: cart.total
            }
        )

        await invoice.save()

        await Cart.findByIdAndUpdate(cartId, { products: [], total: 0 })
        return res.send(
            {
                success: true,
                message: 'Invoice generated successfully',
                invoice
            }
        )
    }catch (e){
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                error: e.message
            }
        )
    }
}

export const getInvoiceByUser = async (req, res) => {
    try {
        const { userId } = req.params

        const invoices = await Invoice.find({ user: userId })
            .populate('user')
            .populate('products.product')

        if (invoices.length === 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'No invoices found for this user'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Invoices found',
                invoices
            }
        )

    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                error: e.message
            }
        )
    }
}

export const getInvoiceById = async (req, res) => {
    try {
        const { invoiceId } = req.params

        const invoice = await Invoice.findById(invoiceId)
            .populate('user')
            .populate('products.product')

        if (!invoice) {
            return res.status(404).send({
                success: false,
                message: 'Invoice not found'
            })
        }

        return res.send(
            {
                success: true,
                message: 'Invoice found',
                invoice
            }
        )
    }catch (e){
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                error: e.message
            }
        )
    }
}