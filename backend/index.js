const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const app=express();
require('dotenv').config();
const route=require('./router/route.js');



app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
  app.use(cors({
      origin: '*'
    }));
app.use('/api',route);

mongoose.connect(process.env.URL)
.then(()=>console.log("connected to mongodb"))
.catch((err)=>console.log("error occured while connecting to the db",err))

const port=5000;
app.listen(port,()=>console.log(`server start listening to the port${port}`))
