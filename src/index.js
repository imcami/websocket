 
import express from 'express'
import routerProd from  './Routes/products.js'
import routerCart from './Routes/cart.js'
import routerViews from './Routes/views.js'
import { Server } from 'socket.io'
import http from 'http'
import { ProductManager } from './ProductManager.js'

//Creo el server y le indico que mi url debe estar codificada
const app = express.json()
const http = http.createServer(app)
const port = 8080
app.use(express.json)
app.use(express.urlencoded({extended:true}))
const server =  app.listen(port, () => {
    console.log(`Server on port ${port}`)
})

//Server de socket.io
const io = Server(server)
io.on('conection', (socket)=>{
    //cuando se establezca la coneccion ejecutar la siguiente funcion
    console.log('Cliente conectado')
    
})
// Rutas
app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)
app.use('/api/views', routerViews)

//Escuchar los eventos new-product, update-product y delete-product mediante .on para recibir las actualizaciones de productos
const prodManager = new ProductManager('src/products.txt')

prodManager.on('new-product', (product) => {
  io.emit('new-product', product);
});

prodManager.on('update-product', (product) => {
  io.emit('update-product', product);
});

prodManager.on('delete-product', (productId) => {
  io.emit('delete-product', productId);
});

  


//Handlebars Config
app.engine('handlebars', engine())
app.set('view engine', 'handlebars') //vistas de handlebars
app.set('views', path.resolve(__dirname, './views')) // /src/views path.resolve


app.get('/', (req, res, next) => {
    res.render('main', { products: prodManager.getProducts() });
    next();
  });
  
//ruta para realtime products
  app.get('/realtime-products', (req, res, next) => {
    res.render('realtimeproducts', { products: prodManager.getProducts() });
    next();
  });

  //404 error
  app.use((req, res, next) => {
    res.status(404);
    res.render('404error');
  });

 //About.handlebars
 app.get('/about', (req, res) => {
    res.render('about');
  });
  
