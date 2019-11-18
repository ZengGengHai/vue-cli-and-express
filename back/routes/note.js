const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require("path")
const marked = require('marked');
const moment = require('moment')


const root = path.join(__dirname,'../note')
//文件目录
let fileArray=[]
/* GET home page. */
router.get('/getNote', function(req, res, next) {
  res.send("This is getNote")
});
router.get('/getNoteList', function(req, res, next) {
  console.log("获取笔记文件列表")
  // let files = findNoteList('./note');
  // res.json(files)
  readDirSync(root)
  console.log(fileArray)
  res.json(fileArray)
  fileArray = []

});
router.get('/getNoteByName/:name', function(req, res, next) {
  console.log(req.params.name)
  let path = req.params.name
  let dir = path.split('-')[0];
  let file = path.split('-')[1];
  console.log(dir,file)
  console.log('./note/' + dir + '/' + file +'.md','ji')
  fs.readFile('./note/' + dir + '/' + file +'.md',function(err,data){
    console.log(err)
    if(err){
      res.send("文件不存在")
    }else{
      var htmlStr = marked(data.toString());
      res.json(htmlStr);
    }
  })

  
  // var fileName = req.params.name
  // fs.readFile('./note/' + fileName + '.md',function(err,data){
  //   if(err){
  //     res.send("文件不存在")
  //   }else{
  //     var htmlStr = marked(data.toString());
  //     res.json(htmlStr);
  //   }
  // })
});

function findNoteList(path){
  let result = []
  let files = fs.readdirSync(path)
  console.log(files);
  files.forEach(val=>{
    if(val.endsWith(".md")){
      result.push(val.split('.md')[0]);
    } 
  })
  return result;
};

function readDirSync(path,dirname){
    let  pa = fs.readdirSync(path);
    pa.forEach((ele,index) => {
      let info = fs.statSync(path+"/"+ele)	
      if(info.isDirectory()){
  
              let dir = {name:ele,data:[],time:info.ctime}
              fileArray.push(dir)
              readDirSync(path+"/"+ele,ele);
      }else{

              fileArray.forEach((item,index) => {
                  if(item.name === dirname){
                   
                     item.data.push({fileName:ele.split('.md')[0],url:dirname+'-'+ele.split('.md')[0],size:info.size,time:info.ctime})
                  }
              })
      }	
    })
}


module.exports = router;
