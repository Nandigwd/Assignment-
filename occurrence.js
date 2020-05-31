var request = require('request');
// const fs = require('fs');
// const readline = require('readline');
// const stream = require('stream');

// Streams 
// request('http://norvig.com/big.txt').pipe(fs.createWriteStream('file.txt'));  // asynchronous 
// var instream = fs.createReadStream(filename);
// var outstream = new stream;
// var rl = readline.createInterface(instream, outstream);
// rl.on('line', function(line) {
//   // process line here
// });
// rl.on('close', function() {
//   // do something on finish here
//   console.log('done');
// });
//https://www.w3.org/TR/PNG/iso_8859-1.txt // small file


const top_ten_words = (callback) =>{

    request.get("http://norvig.com/big.txt", (err, response, body) =>{

        const count = {};
        const key = [];
        var top_10 = [];

        if (err) { return callback (console.log(err)); }
        
        // var array = fs.readFileSync('file.txt').toString().split(/\W+/);
        var array = body.toString().split(/\W+/);

        console.log('Formating into Array is  done');

 
            for(i in array) {
                var word = array[i].toLowerCase();
                if(word.length >= 4 & !/\d+/.test(word) ){
                    if(count[word] === undefined ){
                        count[word] =  1;
                        key.push(word); 
                    }else{
                        count[word] = count[word] +1;
                    }
                }
            }
        console.log('Occurrences count of words is done');


                key.sort(compare);   
                function compare(a,b){
                let counta = count[a];
                let countb = count[b];
                return countb - counta;
                };
        console.log('Sorting According to count is done');


        for(var j= 0; j <10 ; j++) {
            top_10[key[j]] =  count[key[j]]
        }

        return callback(top_10);
   });

}
module.exports.top_words = top_ten_words;
