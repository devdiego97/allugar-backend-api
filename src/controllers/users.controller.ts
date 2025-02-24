import { Request,Response } from "express"
import { UserModel } from "../models/users.model"
import { userSchema, userSchemaLogin, userSchemaUpdate } from "../schemas/user.schema"
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"
import path from 'path'
import fs from 'fs/promises'
import { PropertyModel } from "../models/propertys.model"

dotenv.config()

export const UserController={
    getAllUsers:async(req:Request,res:Response)=>{
       try{
           const usersList=await UserModel.findAll(
            {include:{model:PropertyModel,as:'imoveis'}}
            
           )
            res.json(usersList)
       }catch(e){
        res.status(400).json('erro no servidor')
            console.log(e)
       }
    },
    getUserId:async(req:Request,res:Response)=>{
        try{
            const {id}=req.params
            const usersId=await UserModel.findByPk(id)
            if(usersId){
                res.status(200).json(usersId)
            }else{
                res.status(404).json('usuário não existe')
            }
        }catch(e){
            res.status(400).json('erro no servidor')
            console.log(e)
        }
    },
    sigIn:async(req:Request,res:Response)=>{
        try{
            const data:{email:string,password:string}=req.body
            const valid=userSchemaLogin.validate(data)
            if(valid.error){
                res.json(valid.error.details[0].message)
            }else{
                const  user=await UserModel.findOne({where:{email:data.email,password:data.password}})
                if(user){
                      const token=jwt.sign(
                        {email:user.email,password:user.password,type:user.type},process.env.KEYJWT as string
                      )  
                      res.status(200).json({user,token,status:true})
                }else{
                    res.json('usuário não existe')
                }
            }
        }catch(e){
            res.status(400).json('erro no servidor')
            console.log(e)
        }
    },
    registerUser:async(req:Request,res:Response)=>{
        try{
            const data=req.body
            const valid=userSchema.validate(data)
            if(valid.error){
                res.json(valid.error.details[0].message)
            }else{
                const user=await UserModel.findOne({where:{email:data.email,password:data.password}})
                if(!user){
                    const user=await UserModel.create(data)
                    const  token=jwt.sign({email:user.email,password:user.password,type:user.type},
                          process.env.KEYJWT as string
                    )
                    res.status(201).json({status:true,user,token})
                }else{
                    res.status(200).json('conta de usuário já existe')
                }

            }
        }catch(e){
            res.status(400).json('erro no servidor')
            console.log(e)
        }
    },
    updateUserId:async(req:Request,res:Response)=>{
       try{
            const {id}=req.params
            const data=req.body
            const valid=userSchemaUpdate.validate(data)
            if(valid.error){
                res.json(valid.error.details[0].message)
            }else{
               const user=await UserModel.findByPk(id)
               if(user){
                  
                        const photoAntigaPath =user.photo ? path.join(__dirname,`./../../${user.photo}`) : null
                        try {
                            // Verifica e exclui a foto antiga, se existir
                            if (photoAntigaPath) {
                                await fs.access(photoAntigaPath)
                                    .then(() => fs.unlink(photoAntigaPath))
                                    .then(() => console.log('Foto antiga excluída com sucesso.'));
                            } else {
                                console.log('Nenhuma foto antiga para excluir.');
                            }
                            
                            const newPhoto = req.file ? `public/imgs/${req.file.filename}` : user.photo;
                            await UserModel.update({...data,photo:newPhoto},{where:{id}})
                            res.json('usuário atualizado')
                          } catch (error) {
                            console.error('Erro ao excluir a foto antiga:', error)
                          }

               }else{
                res.json('usuário não existe')
               }
            }




       }catch(e){
        res.status(400).json('erro no servidor')
        console.log(e)
       }
    },
    deleteUserId:async(req:Request,res:Response)=>{
        try{
            const {id}=req.params
            const userId=await UserModel.findByPk(id)
            if(userId){
                const photoAntigaPath =userId.photo ? path.join(__dirname,`./../../${userId.photo}`) : null
                try {
                    // Verifica e exclui a foto antiga, se existir
                    if (photoAntigaPath) {
                        await fs.access(photoAntigaPath)
                            .then(() => fs.unlink(photoAntigaPath))
                            .then(() => console.log('Foto antiga excluída com sucesso.'));
                    } else {
                        console.log('Nenhuma foto antiga para excluir.');
                    }
                    await UserModel.destroy({where:{id}})
                    res.status(200).json('usuário deletado')
                  } catch (error) {
                    console.error('Erro ao excluir a foto antiga:', error)
                  }
            }else{
                res.status(404).json('usuário não existe')
            }
        }catch(e){
            res.status(400).json('erro no servidor')
            console.log(e)
        }
    }
}