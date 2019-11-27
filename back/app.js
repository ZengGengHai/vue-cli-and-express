const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const moment = require('moment')
const history = require('connect-history-api-fallback');
const indexRouter = require('./routes/index');
const router = express.Router();

const noteRouter = require('./routes/note');
const blogRouter = require('./routes/blogApi')
const adminRouter = require('./routes/adminApi')
const friendRouter = require('./routes/friendApi')
const statisticsRouter = require('./routes/statisticsApi')

//JSON WEBTOKEN
const jwt = require('jsonwebtoken');



//日记morgan组件
const app = express();
const fs = require('fs');
const rfs = require('rotating-file-stream')
// const accessLogger = fs.createWriteStream('access.log', { flags: 'a' });
// const uuid = require('node-uuid')
const logDirectory = path.join(__dirname, 'log')
// 确保文件夹存在
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
const errorLog = fs.createWriteStream('log/error.log', {flags: 'a'})
const accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory 
})

//自己编写中间间统计用户访问
const StatisticsLog = fs.createWriteStream('log/statistics.log', {flags: 'a'})
const statistics = (req,res,next) =>{

  //访问日记
  if(req.method == undefined  || req.headers['referer'] == undefined || req.url == undefined ){
     next();
     console.log("不记录日记")
  }else{
    console.log("记录日记")
    let user_ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;;
    let time = moment(new Date()).format(('YYYY-MM-DD HH:mm:ss'));
    if(req.url.indexOf('static')<0){
      let content = user_ip+' '+time+' '+req.url+' '+req.headers['referer']+' '+req.method+' '+req.headers['user-agent'];
      console.log(content)
      StatisticsLog.write(content);
      StatisticsLog.write('\n');
    }
    next();

  }


};

app.use(statistics);

/**
 * 
 */
app.use(express.static('public'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//设置跨域请求
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader('Access-Control-Max-Age', 86400);
  res.header("X-Powered-By", ' 3.2.1')
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
});



/**
 * 拦截器
 */
app.use(function (req, res, next) {
  if(req.headers.referer) {
    if(req.headers.referer.indexOf('admin') >= 1){
      console.log('请求来自管理员页面,获取token,进行验证')
   
      //登录页面不需要验证
      if(req.headers.referer.indexOf('login') >= 1){
        console.log("ddd")
         next();
      //后台页面每次请求一次都要验证token是否有效
      }else{
        console.log("token验证")
        console.log(req.headers)
        
        if(req.headers.authorization){
          console.log('有token')
          jwt.verify(req.headers.authorization,'secrekey',(err,authData) => {
            if(err){
                console.log('验证不通过,token无效')
                res.json({
                  code:-2,
                  msg:'token无效'
              });
            }else{
                console.log('通过验证,token有效')
                next();
            }
          });
        }else{
           next()
        }
      }
  
    
    }else{
      console.log('请求来自前台页面')
    
      next();
    }
  }else{
    next();  
  }

 




});






app.use(history({

  rewrites: [
    // {
    //   from: /^\/note\/.*$/,
    //   to: function(context) {
    //     return  context.parsedUrl.pathname;
    //   }
    // },
    {
      from: /^\/api\/.*$/,
      to: function(context) {
        return  context.parsedUrl.pathname;
      }
    }
  
  ]
}));

//log only 4xx and 5xx responses to console
app.use(logger('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))
app.use(logger('short'));
// app.use(logger('short', {stream: accessLogger}));
// setup the logger
app.use(logger('combined', { stream: accessLogStream }))


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/note',noteRouter);
app.use('/api/',blogRouter);
app.use('/api/',adminRouter);
app.use('/api/',friendRouter);
app.use('/api/statistics',statisticsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next();
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  const meta = '[' + new Date() + '] ' + req.url + '\n';
  errorLog.write(meta + err.stack + '\n');

  // render the error page
  return res.status(err.status || 500);
  res.render('error');
});

function returnJSON(res,json){
  res.statusCode = 200;
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify(json))
};


module.exports = app;
