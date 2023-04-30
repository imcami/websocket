import {promises as fs} from 'fs' //importo solamente promesas  

//ProductManager escucha el evento new-product mediante emit.io para recibir las actualizaciones de productos 
const productManager = new ProductManager();

productManager.on('new-product', (product) => {
  io.emit('new-product', product);
});

export class ProductManager {
   constructor(path){
        this.path = path //mediante el path hago todas las operaciones del txt
        this.products = [];
        this.incrementId = 1;

  }   

  static incrementId() {
    if (this.incrementId) {
       this.incrementId++
          } else {
           this.incrementId = 1
          }
          return this.incrementId
       }
saveProducts(){
  try {
    const data = JSON.stringify(this.products, null, 2)
    fs.writeFile(this.path, data)
  } catch (error) {
    console.log(`error writing to file ${this.path} : ${error} `)
  }
}   
//poner el await en el addproduct y modificar para que ande bien el id
addProduct (title, description, price, thumbnail, code, stock) {
// valido que todos los campos sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock ) {
         console.error(`All fields are required`);
     return; 
     }
//validar que el campo "code" no se repita
      const productExists = this.products.some(product => product.code === code)
             if (productExists) {
                  console.error(`the product ${code} already exists`);
              return;
           } 
    
      const newProduct = {
            id: this.incrementId++, 
             title,
            description,
            thumbnail,
            code, 
            stock
        };
        this.products.push(newProduct)
        this.saveProducts();
        console.log("The product was added successfully")
      
    }
    
    //getProduct debe devolver un arreglo vacio
    async getProducts(){
        //consulto el array del txt 
        try {
            const data = await fs.readFile(this.path,"utf-8");
            console.log(data);
            this.products = JSON.stringify(data)
            // this.incrementId = this.incrementId()
            return this.products
           } catch (error) {
             console.error(`Can not read File ${this.path}: ${error}`);
           }
     //return this.products
    }

   async  getProductById(id){
    //conversion 
     const prodsJSON =  await fs.readFile(this.path, 'utf-8')
     console.log(prodsJSON);
     const prods = JSON.parse(prodsJSON);
     //console.log(prods);
     const product = prods.find(p => p.id == id);
     if (!product) {
      console.error(`Product id not found ${id}`);
      }else{
      return product;
      }
    }


   updateProduct (id, updateData){
     const productIndex = this.products.findIndex(product=> product.id === id)
     {
      if(productIndex === -1){
        console.error(`Product id ${id} was not found`);
        return;
      }
      const updateProduct = {...this.products[productIndex], ...updateData};
      this.products[productIndex] = updateProduct;
      this.saveProducts();
      console.log(`Product id ${id} successfully updated`)
     }
    }

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
  
  
  








 