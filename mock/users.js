const Mock = require('mockjs');//导入mock.js模块

const config=require("../src/utils/config");
const {apiPrefix}=config;
const userData=Mock.mock({
    'data|95':[{
        'key|+1':1,
        'name':'Edward King',
        'age':32,
        'address':'London, Park Lane no1'
    }]
})

module.exports={
    //post 请求   /api/v1/users/是拦截地址   方法内部接受request  response对象
    [`GET ${apiPrefix}/users`](req,res){
        res.json(userData)
    }
}