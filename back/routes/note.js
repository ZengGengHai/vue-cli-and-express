const express = require('express');
const router = express.Router();
const fs = require('fs');
const marked = require('marked');

/* GET home page. */
router.get('/getNote', function(req, res, next) {
  res.send("This is getNote")
});
router.get('/getNoteList', function(req, res, next) {
  let files = findNoteList('./note');
  res.json(files)
});
router.get('/getNoteByName/:name', function(req, res, next) {
  console.log(req.params.name)
  var fileName = req.params.name
  fs.readFile('./note/' + fileName + '.md',function(err,data){
    if(err){
      res.send("文件不存在")
    }else{
      var htmlStr = marked(data.toString());
      res.json(htmlStr);
    }
  })
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

}


module.exports = router;
