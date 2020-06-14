const express=require('express')
const cors=require('cors')
const bodyparser=require('body-parser')
const app=express()
const db=require('./config/mongoose')

app.use(cors())
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


app.use('/api',require('./routes/todo'))
app.use('/api/user',require('./routes/user'))


app.listen(3000,()=>{
    console.log("server stared successfully")
})


