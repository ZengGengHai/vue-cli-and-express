const express = require('express');
const router = express.Router();
const fs = require('fs');
const readline = require('readline')
const stream = require('stream')


/* GET home page. */
router.get('/getTodayVisit/:time', function(req, res, next) {
    console.log(req.params.time)
    let reg = req.params.time
    let time = new RegExp(reg,'g');
    let instream = fs.createReadStream('./log/statistics.log');
    let rl = readline.createInterface(instream, new stream);
    let pathCountMap = {}
    rl.on('line',function(line){
        if(time.test(line) && /GET/.test(line)){
            let path = line.split(' ')[4]
            pathCountMap[path] = (pathCountMap[path] || 0) +1
         
        }
    });

    rl.on('close',function(){
      let array = Object.keys(pathCountMap).sort((a,b) => {
            return pathCountMap[b]-pathCountMap[a];
        });
      let newArray= [];
      for(var i =0;i <array.length;i++){
        let line ={url:array[i],num:pathCountMap[array[i]]}
        newArray.push(line)
      }
      returnJSON(res,{
        code:0,
        data:newArray
      })   
         
    })

});



function returnJSON(res,json){
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(json))
};



module.exports = router;