import * as express from 'express';

import {filesDestination, upload} from '../configurations/multer';
import {db,firebase} from '../configurations/firestore';
const { Storage } = require('@google-cloud/storage');
const fs=require("fs");
const router = express.Router();
const chalk=require('chalk')


const myCollection=db.collection("My Files");

// router.get("/showall",(req,res)=>{
//     fireSQL.query('SELECT * FROM My Files').then(images => {
//         images.forEach(image => {
//           res.write(image.Name)
//           console.log(image)
//         });
//       });
// })

//the upload.single handler is necessary to be able to parse the form-data
//upload.single to parse only one file
//singleImage is the name of the field that will hold the file (In PostMan set singleImage as the key)
//Using Postman, you might disable a Content-type json header if you have one
router.post("/",upload.single('singleImage'),(req:any,res:any,next:Function) =>{
    const imageToUpload=req.file;

    let documentToAdd={
        Name: imageToUpload.originalname,
        Type: imageToUpload.mimetype,
        Size: imageToUpload.size,
        path: imageToUpload.path
    }
    myCollection.add(documentToAdd).then(async (doc:any)=>{
        await res.status(201).json({
            image:imageToUpload,  
        });
        
        const storage=new Storage();
        let bucketName:string='otonomus-technology.appspot.com';

        await storage.bucket(bucketName).upload(documentToAdd.path, {
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            // By setting the option `destination`, you can change the name of the
            // object you are uploading to a bucket.
            metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000',
            },}).then(function(image: any){console.log(image)}).catch(function(err:any){
        
                console.log('Something wrong has happened while uploading to firebase: '+err.message)
                console.log(err)
            })
      
        // const ref=firebase.storage().ref()
        // console.log('ref is '+ref)
        // const task=await ref.child(documentToAdd.Name).put(imageToUpload,{contentType:documentToAdd.Type})
        // task.then((snapshot: { ref: { getDownloadURL: () => any; }; })=>snapshot.ref.getDownloadURL())
        //     .then((url: any)=>{console.log(url)})
      
    }).catch(function(err:any){
        console.log(chalk.red.bold('Something wrong happened'))
        console.log(chalk.bold.red(err.message))
        
    })
});
router.delete("/:imageId",async(req:any,res:any)=>{
    const imageToDeleteId=req.params.imageId;
    let docToDelete=await myCollection.doc(imageToDeleteId);

    docToDelete.get().then((doc:any)=>{
        let pathToRemove=doc.data().path;
    console.log("Doc to delete path is "+pathToRemove);
    docToDelete.delete().then(async ()=>{

        fs.unlink(pathToRemove,(err:any)=>{
            if (err)
                return res.json({
                    Error: "Something bad happened While Deleting From Storage!",
                    Message:err.message
                })
            else{
                console.log("Deleted File From Storage");
                return res.send('Successfully Deleted Image From Cloud Firestore & From Server Storage !');
            }
        });

    }).catch((err:any)=>{
        res.json({
            Error: err.message
        });
    });
    });

    // let pathToRemove=docToDelete.data().name;
    // console.log("Doc to delete path is "+pathToRemove);
    // docToDelete.delete().then(async ()=>{

    //     fs.unlink(pathToRemove,(err:any)=>{
    //         if (err)
    //             return res.json({
    //                 Error: "Something bad happened While Deleting From Storage!",
    //                 Message:err.message
    //             })
    //         else{

    //             console.log("Deleted File From Storage");
    //         }
    //     });

    // }).catch((err:any)=>{
    //     res.json({
    //         Error: err.message
    //     });
    // });

   
});

    

module.exports = router;
