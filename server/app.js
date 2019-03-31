//

const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const svgCaptcha = require('svg-captcha');
global.md5 = require('md5');
const app = express();
//CORS：允许跨域
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://xiaoyang:8080");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// // 验证码
// app.get("/coder",(req,res)=>{
//     console.log(req.query);
//     // let captcha=svgCaptcha.create();
//      // 保存到session,忽略大小写
//     //  console.log(captcha.text)
//     //    req.session.coder= captcha.text;
//         // 返回数据直接放入页面元素展示即可
//         // res.type('svg');
//         // res.status(200).send(captcha.data);

// })

let secret = 'sports.app.myweb.www';
// 启用中间件
app.use(cookieParser(secret));
app.use(bodyParser.urlencoded({extended:true}));

//启用session
app.use(session({
    secret:secret,
    resave:true,
    saveUninitialized: true,
    cookie: {maxAge:30*24*3600*1000}
}));

// 数据库连接
global.conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3306,
    database: 'novel'
});
conn.connect();

//文件上传
const storage = multer.diskStorage({
    //file 上传上来的文件的相关信息
    destination: function (req, file, cb) {
        //按照月份存放路径
        cb(null, `./uploads/${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2,'0')}`);
    },
    filename: function (req, file, cb) {
        //保证文件名的不重复 时间+随机数+文件后缀
        // new Date().valueOf() 把时间转化为时间戳
        let filename = new Date().valueOf() + Math.random().toString().substr(2, 8) + '.' + file.originalname.split('.').pop();
        cb(null, filename);
    }
})
// 通过 storage 选项来对 上传行为 进行定制化
global.upload = multer({
    storage: storage
});
// 上传小说封面
app.post('/coverImg',upload.single('images'),(req, res) => {
    // console.log(req.file);
    res.json(req.file);
});

// 配置路由
app.use('/',require('./module/novel'));

app.use('/uploads', express.static('uploads'));
app.listen(81, () => {
    console.log('服务器地址:http://xiaoyang:81');
});