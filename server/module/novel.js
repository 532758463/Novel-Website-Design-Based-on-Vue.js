const express = require('express');
const async = require('async');
const multer = require('multer');
const router = express.Router();

// 添加小说栏目
router.post('/addNovel', (req, res) => {
    let d = req.body;
    if (!d.name || !d.pename || !d.type) {
        console.log("请输入内容");
        return;
    }
    let sql = `INSERT INTO books(bname, kinds, author, wordnum,describe1,cover,addtime,aid) VALUES (?,?,?,?,?,?,?,?)`;
    // // let sql= 'UPDATE books SET bname = ?,kinds=?,auther=?,readnum=?,wordnum=?  WHERE bid = ? AND status=1';
    let data = [d.name, d.type, d.pename, d.number, d.desc, d.path,new Date().toLocaleString(),d.aid];
    conn.query(sql, data, (err, result) => {
        if (err) {
            console.log(err);
            res.json({r:'db_err'});
            return ;
        }
        res.json({
            r: 'success'
        });
    })
})
// 查询所属作者的小说
router.post('/novelBooks', (req, res) => {
    //查询所有小说
    let sql = 'SELECT * FROM books WHERE aid=? AND status = 1 ';
    conn.query(sql,parseInt(req.body.aid),(err, results) => {
        if (err) {
            console.log(err);
            res.json({r:'db_err'});
            return ;
        }
        res.json({
            r: results
        });
    });
});

// 添加对应小说的章节
router.post('/addChapter',(req,res)=>{
    // console.log(req.body);
    let d=req.body;
    let sql=`INSERT INTO SECTION(sname,scontent,bid,addstime) VALUES(?,?,?,?)`;
    let data=[d.sname,d.content,d.bid,new Date().toLocaleString()]
    conn.query(sql,data,(err,result)=>{
        if(err){
            res.json({r:'db_err'});
            return;
        }
        res.json({r:'ok'})
    })
})


// // 核对作者用户名是否重复
router.post('/check', (req, res) => {
   let sql=`SELECT aname FROM author WHERE STATUS=1`;
   conn.query(sql,(err,results)=>{
     for(let i=0;i<results.length;i++){
        if(results[i].aname===req.body.user){
            res.json({r:'repeate'});
            return;
        }
     }
     res.json({r:'ok'});
   })
})
// 作者注册并存入数据库
router.post('/regist',(req,res)=>{
    let d=req.body;
    // console.log(md5(d.passwd));
    let data=[d.user,md5(d.passwd)];
    let sql=`INSERT INTO author (aname,apasswd) VAlUE(?,?)`;
    conn.query(sql,data,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.json({r:'ok'});
    })
})

// 删除小说
router.post('/delete', (req, res) => {
    let sql = `UPDATE books SET status = 0 WHERE bid = ? LIMIT 1`;
    conn.query(sql, req.body.bid, (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                r: 'db_err'
            });
            return;
        }
        res.json({
            r: 'success'
        });
    });
});

// // 章节删除
// router.get('/delete3', (req, res) => {
//     let sql = 'UPDATE section SET status = 0 WHERE sid=? LIMIT 1';
//     // console.log(req.query.sid);
//     conn.query(sql,req.query.sid, (err, result) => {
//         if (err) {
//             res.json({
//                 r: 'db_err'
//             });
//             return;
//         }
//         res.json({
//             r: 'success'
//         });
//         if (result.r == 'success') {
//             console.log(result);
//             window.location.href="/admin/novelAll/searchNovel";
//         }
//     });
// });


//响应登录界面请求
router.post('/login',(req,res)=>{
    // console.log(req.body);
    let d=req.body;
    let sql = 'SELECT * FROM user WHERE status = 1 AND username = ?';
    conn.query(sql, d.username, (err, result)=>{
        //账号是不是存在
        if(!result.length){
            res.json({r:'u_not'});
            return ;
        }
        //判断密码是否正确
        if(md5(d.pwd) != result[0].password){
            res.json({r:'p_err'});
            return ;
        }
        //登录成功
        //保存session信息
        let data=result[0];
        req.session.uid = result[0].uid;
        req.session.username = result[0].username;
        req.session.uimg = result[0].headimg;
        // console.log(req.session);
        //更新状态
        let sql = 'UPDATE user SET loginnum = loginnum + 1, lasttimes = ? WHERE aid = ?';
        conn.query(sql, [new Date().toLocaleString(), result[0].aid], (err, result)=>{
            res.json({r:'ok'});
        });
    });
});

// 获取用户信息
// 获取session信息
router.get('/getUser',(req,res)=>{
    res.send(req.session);
    res.end();
})

// 用户退出登录时清楚session信息
router.get('/clearUser',(req,res)=>{
    req.session.uid ='',
    req.session.username='',
    req.session.uimg='',
    res.send(req.session);
    res.end();
})

// 响应作者登录信息
router.post('/alogin',(req,res)=>{
    let d=req.body;
    // console.log(d);
    if(!d.user){
        return;
    }
    let sql = 'SELECT * FROM author WHERE status=1 AND aname=?';
    conn.query(sql,d.user,(err,result)=>{
        // 账号不存在
        if(!result.length){
            res.json({r:'a_not'});
            return;
        }
        // 判断密码是否正确
        if(md5(d.password)!=result[0].apasswd){
            res.json({r:'p_err'});
            return;
        }
        // 登录成功并保存session信息
      req.session.aid= result[0].aid;
      req.session.aname = result[0].aname;
      req.session.aimg = result[0].aimg; 
    // 更新状态
        let sql ='UPDATE user SET loginnum = loginnum + 1, lasttimes = ? WHERE aid = ?';
        conn.query(sql,[new Date().toLocaleString(), result[0].aid], (err, result)=>{
            res.json({
                r:'ok'
            })
        })
    })
})
// 获取session信息
router.get('/getAuthor',(req,res)=>{
    res.send(req.session);
    res.end();
})
// 作者登录退出时清楚session信息
// 用户退出登录时清楚session信息
router.get('/clearAuthor',(req,res)=>{
    req.session.aid ='',
    req.session.aname='',
    req.session.aimg='',
    res.send(req.session);
    res.end();
})



// 查询所点击小说的信息以及小说章节信息
router.post('/getcbook',(req,res)=>{
    let data={};
    let bid=req.body.bid;
    async.series({
        findBooks: function(callback){
            let sql=`SELECT bid,bname,cover,describe1,author,addtime,wordnum,kinds FROM books WHERE bid=? and status=1`;
            conn.query(sql,bid,(err,result)=>{
                callback(null,result);
            })
        },
        findSection: function(callback){
            let sql=`SELECT sname,scontent,addstime,sid,bid FROM section WHERE bid=? and status=1`;
            conn.query(sql,bid,(err,result)=>{
                callback(null,result);
            })
        }
    },(err,result)=>{
        data.book=result.findBooks;
        data.section=result.findSection;
        res.json(data);
    })
})

router.post('/readbook',(req,res)=>{
    let data={};
    let sid=req.body.sid;
    // console.log(req.body)
    let sql=`SELECT sname,scontent,addstime,bid FROM section WHERE sid=${sid} and status=1`;
    conn.query(sql,(err,result)=>{

        if(result[0].bid) {
            let sql2=`SELECT bid,bname,cover,describe1,author,addtime,wordnum,kinds FROM books WHERE bid=? and status=1`;
            conn.query(sql2,result[0].bid,(err,results)=>{
                // console.log(results);
                res.json({
                    r1:result[0],
                    r2:results[0]
                })
            })
        }
    })
})

// 分类小说的排行榜单
router.get('/getList',(req,res)=>{
    let data={};
    let sql1=`SELECT bid,bname,cover,kinds,author,describe1 FROM books WHERE kinds=? AND status=1 LIMIT 10`;
    
    async.series({
        wordsNumber: function(callback){
            let sql2=`SELECT bid,bname,cover,kinds,wordnum,author FROM books WHERE  status=1 ORDER BY WORDNUM desc LIMIT 10`;
            conn.query(sql2,(err,result)=>{
                callback(null,result);
            }) 
        },
        fantasty:function(callback) {
            let kinds='玄幻';
            conn.query(sql1,kinds,(err,result)=>{
                callback(null,result);
            })
        },
        xianxia:function(callback) {
            let kinds='仙侠';
            conn.query(sql1,kinds,(err,result)=>{
                callback(null,result);
            })
        },
        city:function(callback) {
            let kinds='都市';
            conn.query(sql1,kinds,(err,result)=>{
                callback(null,result);
            })
        }
    },(err,result)=>{
        result.wordsNumber[0].title="字数榜";
        data.wordsList=result.wordsNumber;
        result.fantasty[0].title="玄幻榜";
        data.fantasty=result.fantasty;
        result.xianxia[0].title="仙侠榜";
        data.xian=result.xianxia;
        result.city[0].title="都市榜";
        data.city=result.city;
        res.json(data);
    })
})
// 获取收藏的书架
router.post("/getCollect",(req,res)=>{
    let uid=req.body.uid;
    let sql=`SELECT bid FROM collection where uid=? and status=1`;
    let data=[];
    conn.query(sql,uid,(err,result)=>{
        
        if(!result) {
            res.json({
                r:'db_err'
            })
            return;
        }
      for(let i=0;i<result.length;i++){
          data[i]=result[i].bid;
      }

     let sql2=`SELECT * FROM books where bid in (${data})`;
     conn.query(sql2,(err,r)=>{
        res.json({
            r:r
        })
     })
    })
})

//主页搜索功能
router.post("/search",(req,res)=>{
    // console.log(req.body.value);
    let d=req.body.value;
    let sql =`SELECT * FROM books WHERE bname like '%${d}%' AND status=1`;
    conn.query(sql,(err,result)=>{
        if(!result){
            res.json({
                r:'no_data'
            })
        }
        res.json({
            r:result
        })
    })
})

// 添加收藏到书架
//INSERT INTO author (aname,apasswd) VAlUE(?,?)
router.post("/insert",(req,res)=>{
    let d=req.body;
    // console.log(d);
    let sql=`INSERT INTO COLLECTION (time,uid,bid) VALUE(?,?,?)`;
    let data=[new Date().toLocaleString(),d.uid,d.bid,];
    conn.query(sql,data,(err,result)=>{
        if(err){
            res.json({
                r:'fail'
            })
        }
        res.json({r:'ok'});
    })
})
// 检查书籍是否被收藏
router.post("/checkbook",(req,res)=>{
    let d=req.body;
    let sql=`SELECT * FROM COLLECTION where uid=${d.uid} and bid=${d.bid} and status=1`;
    conn.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }
        if(!result[0]){
            res.json({r:'no'});
        }
        if(result[0]){
            res.json({r:'exist'})
        }
       
    })
})

// 用户添加评论
router.post("/addComment",(req,res)=>{
    let d=req.body;
    let sql=`INSERT INTO comment (time,content,bid,uid,score,uname,uimg) VALUE(?,?,?,?,?,?,?)`;
    let date=new Date().toLocaleDateString();
    let data=[date,d.content,d.bid,d.uid,d.score,d.uname,d.uimg];
    conn.query(sql,data,(err,result)=>{
        if(err) {
            console.log(err);
            return;
        }
        res.json({r:'ok'});
    })
})
router.post("/getComment",(req,res)=>{
    let d=req.body;
    if(!d.bid){
        return;
    }
    let sql=`SELECT content,score,time,uname,uimg FROM COMMENT WHERE bid=${d.bid} and status=1`;
    conn.query(sql,(err,result)=>{
        if(err){
            console.log(err);
            return;
        }
        res.json({r:result});
    })
})



module.exports = router;