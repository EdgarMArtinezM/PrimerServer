const express=require("express")
const app=express()
const classObj=require("./index")
const ini=new classObj()
const port=8080
let nuevo=[]

app.get("/",(req,res)=>{
        res.send(`<h1>Bienvenidos Equipo</h1>`)
})
app.get("/productos",(req,res)=>{
    ini.getAll().then(ress=>{
        res.send(JSON.stringify(ress))
    })
})

app.get("/",(req,res)=>{
    ini.getAll().then(ress=>{
        res.send(JSON.stringify(ress))
    })
})
app.get("/productoRandom",(req,res)=>{
    let nuevo=[]
    ini.getAll().then(ressUo=>{
        for(let x=0;x<ressUo.length;x++){
            nuevo.push(ressUo[x].id)
        }  
        let numero=Math.round((Math.random()*(nuevo.length-1)))
        let todo=nuevo[numero]
        ini.getByid(todo).then(ress=>{
            res.send(ress.message)
        })
    })
   
    
})

app.listen(port,()=>{
    console.log("Servidor iniciado en la ruta http://localhost:"+port)
})
app.on("error",(err)=>console.log("Error en el servidor: "+err))
