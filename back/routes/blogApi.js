var express = require('express');
var router = express.Router();

const Blog = require('../db/ORM');
/* GET article api. */

// api总览
router.get('/blog_api', function(req, res, next) {
    let result = {
        GET_0:'http://127.0.0.1:3000/api/article?id=1',
        GET_1:'http://127.0.0.1:3000/api/article_list?limit=5&offset=0',
        POST_2:'http://127.0.0.1:3000/api/article_create (title content)',
        POST_3:'http://127.0.0.1:3000//api/article_delete  (id)',
        POST_4:'http://127.0.0.1:3000//api/article_update  (id title content)'
  
    }
    returnJSON(res,{
        code:0,
        msg:'welcome to  use blogApi',
        data:[result]
    })
});

// 根据id查询单个blog对象 
router.get('/blog', function(req, res, next) {
    if(req.query.id){
        Blog.findAll({where:{id:req.query.id},raw:true}).then((result) => {        
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
            msg:'请输入参数 eg: id=4'
        }) 
    } 
});



//查询列表  GET /api/blog_list?limit=10&offset=0 (limit为此次请求的数量,offset为偏移量)
router.get('/blog_list', function(req, res, next) {
    let {limit, offset} = req.query
    console.log(limit,offset)
    if(!isNaN(parseInt(limit)) && !isNaN(parseInt(offset))){
        Blog.findAndCountAll({
            limit:limit*1,
            offset:offset*1,
            'order':[
                ['createdAt','DESC']
            ],
            where:{}
        }).then((e) => { 
            if(isNaN(e.rows)){
                //判断下一次查询是否会有数据
                let hasMore = limit*1 + offset*1 < e.count ? true: false
                let result = {
                    hasMore,
                    list:[e.rows]
                }
                returnJSON(res,{
                    code:0,
                    data:[result]
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
            msg:'请输入正确格式与参数类型 eg http://127.0.0.1:3000/api/blog_list?limit=4&offset=5'
        })
    }
});




//创建数据项   POST   /api/blog_create  (title content)',
router.post('/blog_create',function(req,res,next){  
    let body ="";
    req.on('data',function(chunk){
        body += chunk;
    });
    req.on('end',function(){
        let {title,content} = JSON.parse(body)
        if(title && content){
            console.log("ok")
            Blog.create({title,content}).then(function(result){
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
                msg:'在body里面写  {"title":"title","content":"content"} '
            })
        } 
    })
});


//删除数据项   POST    /api/blog_delete  (id)',
router.post('/blog_delete',function(req,res,next){  
    let body ="";
    req.on('data',function(chunk){
        body += chunk;
    });
    req.on('end',function(){
        let {id} = JSON.parse(body)
        if(id){
            Blog.destroy({ 
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
                msg:"在body里面写  {'id':'6'} "
            })
        } 
    })
});


//更新数据项   POST:'/api/blog_update  (id title content)'
router.post('/blog_update',function(req,res,next){  
    let body ="";
    req.on('data',function(chunk){
        body += chunk;
    });
    req.on('end',function(){
        let {id,title,content} = JSON.parse(body)
        if(!id){
            returnJSON(res,{
                code:-2,
                msg:"Id参数必须写，在body里面写  {'id':'6',......} "
            })
         }
         if(title !=undefined || content != undefined){
             console.log("dd")
            Blog.update({title,content}, {where: {id}}
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
                msg:"Id参数必须写，title 或 content 修改其中一项 "
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