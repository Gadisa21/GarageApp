const express=require("express")
require("dotenv").config()
const router=require("./routes")
const cors=require("cors")


const app=express()



app.use(cors())

app.use(express.json())
app.use(require("sanitize").middleware)


app.use(router)
const port=process.env.PORT;
app.listen(port,(err)=>{
    if(err) throw err
    console.log(`Server is running on port ${port}`)
})

module.exports=app