import { InterestModel } from "../models/interest.model"
import { PropertyModel } from "../models/propertys.model"
import { UserModel } from "../models/users.model"
import { Request,Response } from "express"
import { InterestSchema } from "../schemas/interest.schema"

export const InterestsController={
    getAllInterests:async(req:Request,res:Response)=>{
        try{
            const interestsList=await InterestModel.findAll(
              {include:[
                {model:UserModel,as:'interessado'},{model:PropertyModel,as:'propriedade'}
              ]}
            )
            res.json(interestsList)

        }catch(e){
            res.json('erro no servidor')
            console.log(e)
        }
    },
    getInterestId:async(req:Request,res:Response)=>{
        try{
            const {id}=req.params
            const interestId=await InterestModel.findByPk(id,
                {include:[
                    {model:UserModel,as:'interessado'},{model:PropertyModel,as:'propriedade'}
                  ]}
            )
            res.json(interestId)
           

        }catch(e){
            res.json('erro no servidor')
            console.log(e)
        }
    },
    postInterest:async(req:Request,res:Response)=>{
        try{
           
            const data=req.body
            const valid=InterestSchema.validate(data)
            if(valid.error){
                res.json(valid.error.details[0].message)
            }else{
               
                const newInterest=await InterestModel.create({...data,interestdate:Date.now()})
                res.json(newInterest)
            }


        }catch(e){
            res.json('erro no servidor')
            console.log(e)
        }
    },
    deleteInterest:async(req:Request,res:Response)=>{
        try{
            
            const {id}=req.params
            const interesseId=await InterestModel.findByPk(id)
            if(interesseId){
                await InterestModel.destroy({where:{id}})
               res.json('interesse deletado')
            }else{
                res.json('interesse não existe')
            }

        }catch(e){
            res.json('erro no servidor')
        }
    }
}