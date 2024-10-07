
const installService=require('../services/install.service');

async function install(req,res){

    const result=await installService.install();

    if(result.status==200){
        res.status(200).json({message:result})
        ;}
        else{
            
            res.status(500).json({message:result}) ;
        }
}
module.exports={install}
