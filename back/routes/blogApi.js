const express = require('express');
const router = express.Router();
const db = require('../db/ORM');

//JSON WEBTOKEN
const jwt = require('jsonwebtoken');


/* GET article api. */

// api总览
router.get('/blog_table', function(req, res, next) {
    

    let result =[
    { label: "id", prop: "id", type: "normal",content:' ',show:false,data:'int'},
    { label: "标题", prop: "title", type: "normal" ,content:' ',show:true,data:'varChar'},
    { label: "内容", prop: "content", type: "normal" ,content:' ' ,show:true,data:'varCharFwb'},
    { label: "创建时间", prop: "createdAt", type: "normal",content:'',show:true,data:'data'},
    { label: "更新时间", prop: "updatedAt", type: "normal",content:' ',show:true,data:'data'}]
    returnJSON(res,{
        code:0,
        msg:'welcome to  use blog_table',
        data:result
    })
});
router.get('/blog_api', function(req, res, next) {
    let result = {
        GET_0:'http://127.0.0.1:3000/api/blog?id=1',
        GET_1:'http://127.0.0.1:3000/api/blog_list?limit=5&offset=0',
        POST_2:'http://127.0.0.1:3000/api/blog_create (title content)',
        POST_3:'http://127.0.0.1:3000//api/blog_delete  (id)',
        POST_4:'http://127.0.0.1:3000//api/blog_update  (id title content)'
  
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
        db.Blog.findOne({where:{id:req.query.id},raw:true}).then((result) => {        
            if(isNaN(result)){
                returnJSON(res,{
                    code:0,
                    data:result
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
    if(!isNaN(parseInt(limit)) && !isNaN(parseInt(offset))){
        db.Blog.findAndCountAll({
            limit:limit*1,
            offset:offset*1,
            'order':[
                ['id','DESC']
            ],
            where:{}
        }).then((e) => { 
            
            if(isNaN(e)){
                console.log(e)
                if(e.count === 0){
                    returnJSON(res,{
                        code:2,
                        data:[],
                        msg:'没有数据'
                    })   
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
            msg:'请输入正确格式与参数类型 eg http://127.0.0.1:3000/api/blog_list?limit=4&offset=5'
        })
    }
});




//创建数据项   POST   /api/blog_create  (title content)',
router.post('/blog_create',function(req,res,next){  
   
        let {title,content} = req.body
        console.log(title)
        if(title!=undefined  || content !=undefined ){
            console.log("ok")
            db.Blog.create({title,content}).then(function(result){
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
    
});


//删除数据项   POST    /api/blog_delete  (id)',
router.post('/blog_delete',function(req,res,next){  
  
        let {id} = req.body
        if(id != undefined){
            db.Blog.destroy({ 
                where: {
                    id
                }
             }).then(function(result){
                if(result){
                    returnJSON(res,{
                        code:0,
                        data:id
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
    
});


//更新数据项   POST:'/api/blog_update  (id title content)'
router.post('/blog_update',function(req,res,next){  

        let {id,title,content} = req.body
        
        if(id ===  undefined){
            returnJSON(res,{
                code:-2,
                msg:"Id参数必须写"
            })
         }
         if(title !=undefined || content != undefined){
             console.log("dd")
            db.Blog.update({title,content}, {where: {id}}
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
    
});




function returnJSON(res,json){
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(json))
};


module.exports = router;
