
const multer=require('multer');// middleware for handling form-data, which is primarily used for uploading files



//Setting up multer for receiving form-data from our request

const maxFileSize:number=1024**2*5; //5 MB for eg
export const filesDestination:string='uploads/';

const storage = multer.diskStorage({
    destination: function(req:any, file:any, cb:Function) {
      cb(null, filesDestination);
    },
    filename: function(req:any, file:any, cb:Function) {
      cb(null, new Date().toISOString()+" " + file.originalname); //for eg 2020-07-17 meat.png
    }
  });
//I want the supported types to be only png and jpeg
const jpegOrPng='image/jpeg' || 'image/png';
const fileFilter = (req:any, file:any, cb:Function) => {
    // reject a file
    if (file.mimetype == jpegOrPng) {
      cb(null, true);
    } else {
      cb(null, false); //We can, instead on null, create a new Error
    }
  };
export const upload=multer({
    storage:storage,
    dest:filesDestination,
    fileFilter:fileFilter,    
    limits:{
        fileSize: maxFileSize
    }    })