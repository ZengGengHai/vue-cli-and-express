const assert = require('assert');
const request=require('supertest')

describe("验证web服务是否正确",function(){
    it('首页正常显示',function(done){
        request('https://blog.zenggenghai.cn')
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'text/html; charset=UTF-8')
        .expect(200,done);
    });
    it('文档收纳页面正常显示',function(done){
        request('https://blog.zenggenghai.cn')
        .get('/api/note/getNoteList')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200,done);
    });
    it('文档收纳页面正常显示',function(done){
        request('https://blog.zenggenghai.cn')
        .get('/api/note/getNoteList')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200,done);
    });
    it('后台登录路由是否能访问',function(done){
        request('https://blog.zenggenghai.cn')
        .post('/api/admin_login')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json')
        .expect(200,done);
    });
  
})
