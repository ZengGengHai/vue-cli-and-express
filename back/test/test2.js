const assert = require('assert');
const request=require('supertest')

describe("验证web服务是否正确",function(done){
     
    
    it('首页正常显示',function(){
        request('https://blog.zenggenghai.cn')
        .get('/',function(err,res,body){
           
            assert.equal(200,res.statusCode);
            assert.notEqual(-1,body.indexOf('<html>'))
            assert(body.indexOf("jjkjkjkj") >= 0, '应该包含');
     
            
            done();
        })
    });
  
})
