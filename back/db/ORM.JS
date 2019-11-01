const Sequelize = require('sequelize');

const sequelize = new Sequelize('my_db','root','server',{
    host:'localhost',
    dialect:'mysql',
    timezone: '+08:00', // 保存为本地时区
    pool: {
        max: 5,
        min: 0,
        //建立连接最长时间
        acquire: 30000,
        //空闲最长连接时间
        idle: 10000
    },
    //默认输出执行sql语句
    // logging: console.log
});


//定义文章模型
const Blog = sequelize.define('blog',{
  
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:Sequelize.STRING
    },
    content:{
        type:Sequelize.STRING
    }
},{
    // 自动维护时间戳 [ created_at、updated_at ]
    timestamps: true, 
    // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
    // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
    freezeTableName: true
})

//定义管理员模型
const Admin = sequelize.define('admin',{
  
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    }
},{
    // 自动维护时间戳 [ created_at、updated_at ]
    timestamps: true, 
    // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
    // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
    freezeTableName: true
})



//测试连接
sequelize.authenticate().then(()=>{
        console.log('API 接口服务启动成功');
    }).catch(err=>{
        console.log('API 接口服务启动失败:',err);
    });



module.exports = {Blog,Admin};
