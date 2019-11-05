const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const history = require('connect-history-api-fallback');
const indexRouter = require('./routes/index');
const router = express.Router();

const noteRouter = require('./routes/note');
const blogRouter = require('./routes/blogApi')
const adminRouter = require('./routes/adminApi')



//JSON WEBTOKEN
const jwt = require('jsonwebtoken');




const app = express();
app.use(express.static('public/upload-single'));

//访问静态支援


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//设置跨域请求
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});





/**
 * 拦截器
 */
app.use(function (req, res, next) {
  console.log(req.headers.referer)
   
  if(req.headers.referer.indexOf('admin') >= 1){
    console.log('请求来自管理员页面,获取token,进行验证')
    console.log(req.headers.referer.indexOf('login'))

    //登录页面不需要验证
    if(req.headers.referer.indexOf('login') >= 1){
      console.log("ddd")
       next();

    //后台页面每次请求一次都要验证token是否有效
    }else{
      
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
        next();
      }


    }

  
  }else{
    console.log('请求来自前台页面')
    next();
  }




});






app.use(history({

  rewrites: [
    {
      from: /^\/note\/.*$/,
      to: function(context) {
        return  context.parsedUrl.pathname;
      }
    },
    {
      from: /^\/api\/.*$/,
      to: function(context) {
        return  context.parsedUrl.pathname;
      }
    }
  
  ]
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/note',noteRouter);
app.use('/api/',blogRouter);
app.use('/api/',adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
