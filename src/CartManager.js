export class CartManager {
    constructor(path){
         this.path = path //mediante el path hago todas las operaciones del txt
         this.cart = [];
         this.incrementId = 1;
 
   }  
   async createCarrito() {
    const cartsJSON = await fs.readFile(this.path, 'utf-8')
    const carts = JSON.parse(cartsJSON)
    const carrito = {
        id: CartManager.incrementarID(),
        cantidad: []
    }
    carts.push(carrito)
    await fs.writeFile(this.path, JSON.stringify(carts))
    return "Carrito creado"
}
   //id del producto
   static incrementId() {
    if (this.incrementId) {
       this.incrementId++
          } else {
           this.incrementId = 1
          }
          return this.incrementId
       } 
    
        productExists () {
           if (this.productExists){
            this.addToCartById
           }else{
            console.error('product not exist')
           }
       } 
       //Agrega los productos por Id
   async addToCartById(id, quantity, idCart){
    //conversion 
     const prodsJSON =  await fs.readFile(this.path, 'utf-8')
     const prods = JSON.parse(prodsJSON);
     //console.log(prods);
     const cart = cart.find(cart => cart.id === parseInt(idCart));
     if (cart.quantity.some(product => product.id === parseInt(id))) {
      if (carrito.cantidad.some(product => product.id === parseInt(id))) {
        // Si el producto ya existe, actualizar la cantidad
        const productIndex = carrito.cantidad.findIndex(product => product.id === parseInt(id))
        carrito.cantidad[productIndex].quantity += quantity
    } else {
        // si el producto no existe, crear un nuevo objeto y añadirlo al carrito
        const newProduct = { id: parseInt(id), quantity: quantity }
        carrito.cantidad.push(newProduct)
    }
    
      }else{
      return product;
      }
      //encontrar el array del carrito modificado 
      const cartIndex = carts.findIndex(cart => cart.id === parseInt(idCart))
      //actualizar el array con el objeto modificado
      carts[cartIndex] = carrito
      //Guardar el carrito actualizado
      const updatedCartsJSON = JSON.stringify(carts)
      await fs.writeFile(this.path, updatedCartsJSON, 'utf-8')
    }

   

//elimina los productos por id
    delateProduct(id){
        const productIndex =this.products.findIndex(product => product.id === id);
        if(productIndex === -1){
          console.error(`product id ${id} does not finded`)
          return;
        }
        this.products.splice(productIndex, 1)
        this.saveProducts();
        console.log(`product id  ${id} successfully delated `)
        }
    

            
}
 



