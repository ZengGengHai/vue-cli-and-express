const express = require('express');
const router = express.Router();

const db = require('../db/ORM');

//JSON WEBTOKEN
const jwt = require('jsonwebtoken');

/* GET article api. */

// 表结构总览
router.get('/admin_table', function(req, res, next) {
    let result =[
    { label: "id", prop: "id", type: "normal" ,content:'',show:false,data:'int'},
    { label: "账号", prop: "username", type: "normal",content:'',show:true,data:'varchar' },
    { label: "密码", prop: "password", type: "normal",content:'',show:true,data:'varchar' },
    { label: "创建时间", prop: "createdAt", type: "normal" ,content:'',show:true,data:'data'},
    { label: "更新时间", prop: "createdAt", type: "normal" ,content:'',show:true,data:'data'}]


    


    returnJSON(res,{
        code:0,
        msg:'welcome to  use adminTable',
        data:result
    })
});


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

//登录接口
router.post('/admin_login',function(req,res,next){  

    let {username,password} = req.body
        if(username !=undefined || password != undefined){
            console.log("dd")
            db.Admin.findOne({where:{username,password},raw:true}).then((result) => {        
            if(isNaN(result)){
                // returnJSON(res,{
                //     code:0,
                //     data:result
                // })
                // console.log(result)
                jwt.sign({user:result},'secrekey', { expiresIn: '2 days' },(err,token) => {
               
                    returnJSON(res,{
                        code:0,
                        token:token
                    })
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
});





//查询列表  GET /api/blog_list?limit=10&offset=0 (limit为此次请求的数量,offset为偏移量)
router.get('/admin_list', function(req, res, next) {
    let {limit, offset} = req.query
    // console.log(limit,offset)
  
    if(!isNaN(parseInt(limit)) && !isNaN(parseInt(offset))){
        db.Admin.findAndCountAll({
            limit:limit*1,
            offset:offset*1,
            'order':[
                ['createdAt','DESC']
            ],
            where:{}
        }).then((e) => { 
            if(isNaN(e.rows)){
                if(e.count === 0){
                    returnJSON(res,{
                        code:2,
                        data:[],
                        msg:'没有数据'
                    }) 
                    return   
                }
                //判断下一次查询是否会有数据
                let hasMore = limit*1 + offset*1 < e.count ? true: false
                let result = {
                    hasMore,
                    count:e.count,
                    list:e.rows
                }
                returnJSON(res,{
                    code:0,
                    data:result
                })
            }else{
                returnJSON(res,{
                    code:-2,
                    msg:'not found'
                })
            }
        })
    }else{
        returnJSON(res,{
            code:-2,
            msg:'请输入正确格式与参数类型 '
        })
    }
});




//创建数据项   POST   /api/blog_create  (title content)',
router.post('/admin_create',function(req,res,next){  
   
        let {username,password} = req.body

        if(username!=undefined  || password !=undefined ){
            console.log("ok")
            db.Admin.create({username,password}).then(function(result){
                if(result){
                    returnJSON(res,{
                        code:0,
                        data:{
                            id:result.dataValues.id
                        }
                    })
                
                }else{
                    returnJSON(res,{
                        code:-2,
                        msg:'created false'
                    })
                }
            })
        }else{
            returnJSON(res,{
                code:-2,
                msg:'填写正确参数'
            })
        } 
    
});


//删除数据项   POST    /api/blog_delete  (id)',
router.post('/admin_delete',function(req,res,next){  
  
        let {id} = req.body
        if(id != undefined){
            db.Admin.destroy({ 
                where: {
                    id
                }
             }).then(function(result){
                if(result){
                    returnJSON(res,{
                        code:0,
                        data:{id}
                    })   
                }else{
                    returnJSON(res,{
                        code:-2,
                        msg:'delete false'
                    })
                }
            })
        }else{
            returnJSON(res,{
                code:-2,
                msg:"填写参数id "
            })
        } 
    
});


//更新数据项   POST:'/api/blog_update  (id title content)'
router.post('/admin_update',function(req,res,next){  

        let {id,username,password} = req.body
        
        if(id ===  undefined){
            returnJSON(res,{
                code:-2,
                msg:"Id参数必须写"
            })
         }
         if(username !=undefined || password != undefined){
            
            db.Admin.update({username,password}, {where: {id}}
                ).then(function(result){
                if(result){
                    returnJSON(res,{
                        code:0,
                        data:{ id}
                    })   
                }else{
                    returnJSON(res,{
                        code:-2,
                        msg:'update false'
                    })
                }
            })
         }else{
            returnJSON(res,{
                code:-2,
                msg:"Id参数必须写 "
            }) 
         }
    
});






function returnJSON(res,json){
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(json))
};


module.exports = router;
