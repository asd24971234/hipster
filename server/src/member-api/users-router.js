const express = require('express')
// const User = require(__dirname + '/users-sql')


// mysql2 async-await用的
const db = require(__dirname + './../db_connect2')

const router = express.Router()

// 執行sql用的async-await的函式
// sql 執行用的sql
// res 回應
// method restful的方法，預設為get
// multirow 是否為多資料回傳，預設為是
// instance 物件實體，預設為空物件
async function executeSQL(
  sql,
  res,
  method = 'get',
  multirows = true,
  instance = {}
) {
  try {
    const [rows, fields] = await db.promisePool.query(sql)

    switch (method) {
      case 'post': {
        // 仿照json-server的回傳
        const insertId = { id: rows.insertId }
        // 合併id值
        const result = { ...instance, ...insertId }
        //回傳
        res.status(200).json(result)
        break
      }
      case 'put': {
        // 仿照json-server的回傳，有更新到會回傳單一值，沒找到會回到空的物件字串
        // console.log(rows.affectedRows)
        let result = {}
        if (rows.affectedRows) result = { ...instance }
        //回傳
        res.status(200).json(result)
        break
      }
      case 'delete': {
        // 仿照json-server的回傳
        res.status(200).json({})
        break
      }
      case 'get':
      default:
        {
          if (multirows) {
            res.status(200).json({
              users: rows,
            })
          } else {
            // 仿照json-server的回傳，有找到會回傳單一值，沒找到會回到空的物件字串
            let result = {}
            if (rows.length) result = rows[0]
            res.status(200).json(result)
          }
        }
        break
    }
  } catch (error) {
    // 錯誤處理
    console.log(error)

    // 顯示錯誤於json字串
    res.status(200).json({
      message: error,
    })
  }
}



// 以下為路由

// 處理會員登入
router.post('/loginmember', async (req, res, next) =>{
  // console.log(typeof req.body)
  // console.log(req.body)
  const memberMail = req.body.memberMail
  const memberPwd = req.body.memberPwd
    // console.log('acc:'+memberMail)
    // console.log('pwd:'+memberPwd)
  const loginMemberSql = `SELECT * FROM member WHERE  memberMail=? AND memberPwd=? `
  const [r1] = await db.query(loginMemberSql, [memberMail,memberPwd]);

  const output = {  //建立判斷登入
    success:([r1][0].length)?true:false,
    body:req.body  //表格回傳的fd
  }
  if([r1][0].length){
    req.session.member = {
      memberId:'123',
      memberName:'456',
  }
  }

  res.json(output)

})



// app.get('/logout',(req,res)=>{
//   delete req.session.user
//   res.redirect('/login')
// })







// post 新增一筆會員資料
router.post('/addmember', async (req, res, next) => {
  // 測試response，會自動解析為物件
  console.log(typeof req.body)
  console.log(req.body)
  const memberMail = req.body.memberMail
  const memberPwd = req.body.memberPwd
  const addMemberSql = `INSERT INTO member(memberName, memberGender, memberBirth, memberPhone, 	memberAddress	,	memberMail,	memberPwd,	memberImg, memberStatus) VALUES('訪客','男','2020-01-01','0900000000','請輸入地址',?,?,'tmp','true')`

  const [r1] = await db.query(addMemberSql, [memberMail,memberPwd]);
  res.json(req.body)
})


module.exports = router;