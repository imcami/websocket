import {Router} from "express"
import { ProductManager } from "../ProductManager.js"

const ProductMana = new ProductManager('src/products.txt')

const routerProd = Router()

//obtener la funcion getProducts() del Product Manager
routerProd.get('/', async  (req, res)=> {
       //uso de limit
        const { limit } = req.query
        console.log(limit)
        const products = await ProductMana.getProducts()
        console.log(products)
        res.send(JSON.stringify(products))

    })


routerProd.get('/:id', async  (req, res)=> {
    const product = await ProductMana.getProductById(req.params.id)
    console.log(product)
    res.send(JSON.stringify(product))
})

routerProd.post('/', async  (req, res)=> {
    let message = await ProductMana.addProduct(req.params.id)
    res.send(message)
})

routerProd.delete('/:id', async (req, res)=>{
    let message = await ProductMana.deleteProduct(req.params.id)
    res.send(message)
})

routerProd.put('/:id', async(req, res)=>{
    let message = await ProductMana.updateProduct(req.params.id, req.body)
    res.send(message)
})

//hacer un emit cada vez que actualice, cree o borre el socket



export default  routerProd;