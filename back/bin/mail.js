const nodemailer = require('nodemailer');

//开启一个SMTP链接

let transporter = nodemailer.createTransport({
    host:'smtp.qq.com',
    port: 465,
    secureConnection:true,
    secure:true,
    auth:{
        user:'2627191377@qq.com',
        pass:'wwacnydskhhceacg'  //QQ邮箱需要使用授权码
    }
});

let mailOptions = {
    from: 'Falcon Heavy <2627191377@qq.com>', //发件人
    to:'2627191377@qq.com', //收件人
    subject:'预警信息', //标题
    text:'', //文本格式内容
    html:'<p style="color:red">服务器错误</p>' //Html格式内容
}

exports.send = function (subject,content){
    if(subject && content){
        mailOptions.subject = subject
        mailOptions.text = content
        transporter.sendMail(mailOptions,(error,info) => {
            console.log(`Message: ${info.messageId}`);
            console.log(`send: ${info.response}`)
        });
    }
}