var express = require('express');
var router = express.Router();

const Admin = require('../db/ORM');
/* GET article api. */

router.get('/admin_api', function(req, res, next) {
    let result = {
    
        POST_0:'http://127.0.0.1:3000/api/admin (username password)  ：查找用户',
   
  
    }
    returnJSON(res,{
        code:0,
        msg:'welcome to  use blogApi',
        data:[result]
    })
});

//查找用户
router.post('/admin',function(req,res,next){  
    let body ="";
    req.on('data',function(chunk){
        body += chunk;
    });
    req.on('end',function(){
        let {username,password} = JSON.parse(body)
  
         if(username !=undefined || password != undefined){
             console.log("dd")
             Admin.findAll({where:{id:1},raw:true}).then((result) => {        
                if(isNaN(result)){
                    returnJSON(res,{
                        code:0,
                        data:[result]
                    })
                }else{
                    returnJSON(res,{
                        code:-2,
                        msg:'no find'
                    })
                }     
            })      
            
         }else{
            returnJSON(res,{
                code:-2,
                msg:"password and username参数必须写"
            }) 
         }
    })
});




function returnJSON(res,json){
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(json))
};


module.exports = router;
