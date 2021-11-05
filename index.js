const fs=require("fs")
const pass=require("./pass")


module.exports=class Manager{
        async save(clase){
            try {
                let data = await fs.promises.readFile("nuevo.json", "utf-8")
                let obJson = JSON.parse(data)
                if (obJson.some(evt => evt.id === clase.id)) {
                    return {status: "error", message: "El id ya existe" }
                } else {
                    let dataOb = {
                        id:clase.id,
                        name: clase.name,
                        status: clase.status,
                        hors: clase.hors,
                        alumnos: clase.alumnos
                    }

                    obJson.push(dataOb);
                    try {
                        await fs.promises.writeFile("nuevo.json", JSON.stringify(obJson, null, 2))
                        return {status: "success", message: "Clase creada con el id: " + clase.id}
                    } catch {
                        return {status: "error", message: "No se pudo crear la clase"}
                    }
                }
            }catch (err){
                let dataOb = {
                    id: clase.id,
                    name: clase.name,
                    status: clase.status,
                    hors: clase.hors,
                    alumnos: clase.alumnos
                }
                try{
                    await fs.promises.writeFile('nuevo.json',JSON.stringify([dataOb],null,2))
                    return {status:"success",message:"Clases creada con el id: " + dataOb.id}
                }catch(error){
                    return {status:"error",message:"No se pudo crear la clase: "+error}
                }
            }
        }
        async getAll() {
            try{
                let data = await fs.promises.readFile("nuevo.json", "utf-8")
                if(data!=0){
                    let obje = JSON.parse(data)
                    return obje
                }else{
                    return "El archivo esta vacio"
                }
            }catch (e){
                return {e}
            }
        }
        async getByid(id){
            let data=await fs.promises.readFile("nuevo.json","utf-8")
            let obj=JSON.parse(data)
            let nuevo=obj.filter(res=>res.id===id)
            if(nuevo!=0){
                return {status:"Encontrado",message:JSON.stringify(nuevo)}
            }else{
                return {status:"error",message:"No hay ningun registro"}
            }
        }
        async deleteId(id){
            let data=await fs.promises.readFile("nuevo.json","utf-8")
            let obj=JSON.parse(data)
            let filtro=obj.filter(res=>res.id===id)
            if(filtro!=0){
                let nuevo=obj.filter(res=>res.id!=id)
                if(nuevo!=0){
                    await fs.promises.writeFile("nuevo.json", JSON.stringify(nuevo, null, 2))
                    return {status:"Eliminado",message:"Usuario eliminado correctamente"}
                }else{
                    await fs.promises.writeFile("nuevo.json", JSON.stringify(nuevo, null, 2))
                    return {status:"error",message:"No existe el usuario"}
                }
            }else{
                return {status:"Error",message:"No se encontro ningun registro con ese id"}
            }
        }
        async deleteAll(){
            let data=await fs.promises.readFile("nuevo.json","utf-8")
            let obj=JSON.parse(data)

            for(let x=obj.length;x>0;x--){
                obj.pop();
            }
            await fs.promises.writeFile("nuevo.json", JSON.stringify(obj, null, 2))
            return {status:"Eliminados",message:"Datos eliminados correctamente"}

        }


}
//let nuevo=new Manager()
/*let data={
    id:pass(),
    name:"Matematicas",
    status:"Start",
    hors:[],
    alumnos:[]
}
nuevo.save(data).then(res=>{
    console.log(res.message)
})*/
/*nuevo.getAll().then(res=>{
    console.log(res)
})*/
/*nuevo.getByid("21-2").then(res=>{
    console.log(res.message)
})*/
/*nuevo.deleteId("21-2").then(res=>{
    console.log(res.message)
})*/
/*nuevo.deleteAll().then(res=>{
    console.log(res.message)
})*/

