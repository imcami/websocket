 
import express from 'express'
import routerProd from  './Routes/products.js'
import routerCart from './Routes/cart.js'
import Routerviews from './Routes/views.js'
import { Server } from 'socket.io'


//Creo el server y le indico que mi url debe estar codificada
const app = express()
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
app.use('./api/products', routerProd)
app.use('./api/carts', routerCart)


app.use((req, res, next) => {
    req.io = io
    return next()
  });
app.use('./realtimeproducts')



//Handlebars Config
app.use('handlebars', engine ())//ejecuto json en mi app
app.set('view engine', 'handlebars') //vistas de handlebars
app.set('views', path.resolve(__dirname, './views')) // /src/views path.resolve




export default index.js