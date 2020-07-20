
//MODULES
const express=require("express");
const bodyParser=require("body-parser");
const morgan=require('morgan');

const singleImageRoute=require("../routers/single-image");


//MIDDLEWARES
export const app=express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));


app.use('/uploads',express.static('uploads'));//The uploads folder will be publicly available when accessing localhost:3000/uploads/{imagePath}
app.use("/single-image",singleImageRoute);


//If we arrived here, throw a 404 not found error
app.use((req:any, res:any) => {
   
    res.status(404).json({
        error: {
            message: "Not found"
          }
    });
  });
  
