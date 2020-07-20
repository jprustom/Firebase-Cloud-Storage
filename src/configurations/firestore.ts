import { FireSQL } from 'firesql';
export const firebase=require('firebase');
var admin = require('firebase-admin')


// var firebaseConfig = {
//     apiKey: "AIzaSyD18y7I6djaRwcU2G2oJ8SxovX3MXN6mE4",
//     authDomain: "form-data-test.firebaseapp.com",
//     databaseURL: "https://form-data-test.firebaseio.com",
//     projectId: "form-data-test",
//     storageBucket: "form-data-test.appspot.com",
//     messagingSenderId: "625375574408",
//     appId: "1:625375574408:web:3bf26b139332ee4f18623d"
//   };
var firebaseConfig = {
  apiKey: "AIzaSyABQ-8kS_XoU0gqa7jZaDMfUIXlZQFeK8c",
  authDomain: "otonomus-technology.firebaseapp.com",
  databaseURL: "https://otonomus-technology.firebaseio.com",
  projectId: "otonomus-technology",
  storageBucket: "otonomus-technology.appspot.com",
  messagingSenderId: "446664996115",
  appId: "1:446664996115:web:8f9bf9dfbfc7140aaa96e6",
  measurementId: "G-8SNRK9YEX9"
};
  // // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  admin.initializeApp()
  

  export const db=firebase.firestore();

  export const fireSQL=new FireSQL(db);
