import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import cors from 'cors'

//App config

const app=express();

app.use(cors({
  origin: 'https://forever-website-frontend2.vercel.app',
  credentials: true // if you're using cookies or sessions
}));
const port=process.env.PORT || 4000
connectDB();
connectCloudinary();




//Middlewares

app.use(express.json())
app.use(cors())

//Api endPoints

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("Api Working")
})


app.listen(port,()=> console.log('Server started on the port :' + port))