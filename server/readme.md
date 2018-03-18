## 后台设计

只需要通过web-api 就可以完成交互



| api                 | methods | 作用                     |
|---------------------|---------|--------------------------|
| /article?fliter     | get     | 得到文件列表             |
| /article/:id        | get     | 得到一个上传的文章       |
| /article/opt/upload | post    | 上传/更新一个文章        |
| /article/cst        | get     | 得到文章的分类,系列,标签 |
| /image/upload       | post    | 上传图片                 |


## 得到用户列表

namespace '/user'

```
'STUDENT_LIST'
```

发送完断开连接

返回所有的学生的列表

## admin

`namespace admin`

验证

## 添加一条积分

| 监听          | 作用             |
|---------------|------------------|
| LOGIN         | 登入             |
| LOGOUT        | 登出             |
| ADDSCORE      | 加入一条分值     |
| SETSCORE      | 设定一条分值     |
| DEL_STUDENT   | 删除一个学生     |
| SET_STUDENT   | 设定一个学生     |
| ADD_STUDENT   | 加入一个学生     |
| ADMIN_RESPONE | 你需要监听的消息 |


### 传递参数


**ADDSCORE**

```json
{
  "name":["name1","name2",...],
  "score":Number
}
```

**SETSCORE**

```json
{
  "name":["name1","name2",...],
  "score":Number
}
```


