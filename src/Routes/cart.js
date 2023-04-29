import express from 'express';
import { Router } from 'express';
import { CartManager } from '../CartManager.js';

const app=express();


const routerCart = (Router)
const CartMana = new CartManager('./carrito.txt')

app.get("/cart/:id", async(req, res)=>{
    const cart = await CartMana.addToCartById(req.params.id)
    res.send(product)
})

app.post("/product", async (req, res)=>{
    const {id} = req.body
    await CartMana.addToCartById({id})
    res.send('id del producto obtenido')
})

app.put("/cart/:id", async (req, res) => {
    const id = req.params.id
    const { title, description, price, thumbnail, code, stock } = req.body

    const mensaje = await CartMana.updateProduct(id, { title, description, price, thumbnail, code, stock })

    res.send(mensaje)
})

app.delete("/product/:id", async (req, res) => {
    const id = req.params.id
    const mensaje = await CartMana.deleteProduct(id)
    res.send(mensaje)
})

export default  routerCart;

