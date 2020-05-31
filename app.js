const {top_words}= require ("./occurrence");
const fetch = require("node-fetch");
const express = require('express');
const synonyms = require("synonyms");
require('dotenv').config();


const app = express();

app.use(express.json()); // client to server , for loop, head def


app.get('/wordcount/',(req,res)=>{

    top_words((data)=>{  

            const urls = []  ;
            const text = []  ;
            for (let key in data) {
                text.push(key);
                urls.push(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${process.env.API_KEY}&lang=en-ru&text=${key}`);    
            }

            const apiData = urls.map(url => 
                fetch(url).then(checkStatus)
              );
            
            function checkStatus(response) {
                if (response.ok) { 
                    return Promise.resolve(response.json());
                } else {
                    return Promise.reject(new Error(response.statusText));
                }
            }

            Promise.all(apiData).then( result => { 

                for (let i= 0; i < text.length ; i++) {
                    let temp ={ word :text[i] , count : data[text[i]], synonyms : synonyms(text[i]) , pos :result[i] };
                    result[i] = temp;
                    if(i == (text.length -1)){ 
                    res.json(result);
                    }
                }
      
            });

    });
});
  
app.listen(5000,()=>{
    console.log("Server up and started");
});