require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())
const posts = [{user:"sushil", msg:"all hu akbr"},
{user:"aman", msg:"god is"},
{user:"akbar", msg:"no msg"},
{user:"akbar", msg:"no msg"},
{user:"sushil", msg:"no mssssg"}]


app.get('/',(req,res)=>{
    res.send("server listinng")
})
app.post('/authenticate',authentication,(req,res)=>{
    res.json(req.user)
})
app.post('/posts',authentication,(req,res)=>{
    const postuser = posts.filter(post => post.user == req.user.name)
    res.json({post:postuser,
        user:req.user})
})
app.post("/login",(req,res)=>{
    console.log(req.body.userName)
const userName = req.body.userName
const user = {name:userName}
const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET ,{
    expiresIn: "20s"})
res.json({token})
})

function authentication(req,res,next)
{
    //const authaheader = req.headers["authorization"]
    const authaheader = req.headers.authorization
    console.log(authaheader)
    const token = authaheader && authaheader.split(" ")[1]
    console.log(token)
    if (token == null  ) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err , user) =>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()

    })
}
app.listen(3000)

//ACEESS_TOKEN = "evunvenv74dcdddff44"
//REFRESH-TOKEN = "7dfvbfhbvhbuhbhb4yr74h"