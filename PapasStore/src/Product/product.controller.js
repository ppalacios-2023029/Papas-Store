import Product from '../Product/product.model.js'

export const addProduct = async(req, res) =>{
    try{
        let data = req.body
        let product = new Product(data)
        await product.save()
        return res.send({message: `Register prodcuct ${product.name}`})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error'})
    }
}

export const getAll = async(req, res) =>{
    try{
        const {limit = 20, skip = 0} = req.query
        const products = await Product.find()
            .skip(skip)
            .limit(limit)

        if(products.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Products not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Products found: ',
                products
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error', e})
    }
}

export const getProduct = async (req, res) =>{
    try{
        let {id} = req.params
        let product = await Product.findById(id)

        if(!product) return res.status(404).send(
            {
                success: false,
                message: 'Product not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Product found: ',
                product
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const updateProd = async(req, res) =>{
    try{
        const {id} = req.params
        const data = req.body

        const update = await Product.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'Product not found'
            }
        )
        return res.send(
            {
                success:  true,
                message: 'Product found',
                product: update
            }
        )
    }catch(e){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const deleteProd = async(req, res) =>{
    try{
        let {id} = req.params
        let product = await Product.findById(id)

        if(!product) return res.send({message: 'Product dont found'})

        await Product.deleteOne(product)
        return res.send({message: 'Product deleted'})
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