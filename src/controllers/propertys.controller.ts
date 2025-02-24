import { PropertyModel, IPropertyModel } from './../models/propertys.model';
import {Request,Response} from 'express'
import { propertySchema, propertySchemaUpdate } from '../schemas/property.schema'
import path from 'path'
import fs from 'fs/promises'

export const PropertyController={

    getAllPropertys:async(req:Request,res:Response)=>{
        try{
            const listPropertys= await PropertyModel.findAll()
            res.json(listPropertys)
        }
        catch(e){
            res.json('erro no servidor')
            console.log(e)
        }
    },
    getPropertyId:async(req:Request,res:Response)=>{
        try{
            const {id}=req.params
            const propertyId=await PropertyModel.findByPk(id)
            if(propertyId){
                res.status(200).json(propertyId)
            }else{
                res.json('imóvel não existe')
            }
        }
        catch(e){
            res.json('erro no servidor')
            console.log(e)
        }
    },
    postProperty:async(req:Request,res:Response)=>{
        try{
            const data=req.body
            const valid=propertySchema.validate(data)
            const files = req.files as Express.Multer.File[];
            if(valid.error){
                for (const file of files) {
                    try {
                      await fs.unlink(file.path);
                    } catch (error) {
                      console.error(`Failed to delete file: ${file.path}`, error);
                    }
                  }
                  res.json(valid.error.details[0].message)
            }else{
               
                if (!files || files.length === 0) {
                   console.log('nenhuma imagem enviada')
                  }

                  const gallery = files.map((file) => `${file.filename}`).join(',')
                  const property = await PropertyModel.create({...data,gallery:gallery.length === 5 ? gallery : null,published:Date.now() })
                  res.status(201).json({ message: 'Property created successfully.',property });

            }
        }
        catch(e){
            res.json('erro no servidor')
            console.log(e)
        }
    },  
   updatePropertyId:async(req:Request,res:Response)=>{
        try{
            const { id } = req.params
            const propertId = await PropertyModel.findByPk(id) as IPropertyModel
            const data=req.body
            if (!propertId) {
                 res.status(404).json({ error: 'Imóvel não existe' })
            }

            const valid=propertySchemaUpdate.validate(data,{abortEarly:true})
            if(valid.error){
                const uploadedFiles = req.files as Express.Multer.File[] //pegar os aqruibos de upload
                //Deletando cada arquivo enviado no upload 
                for (const file of uploadedFiles) {
                    const filePath = path.join(__dirname, '../../public/gallery/', file.filename)
                    try {
                        await fs.unlink(filePath);
                        console.log(`Imagem ${file.filename} deletada após falha de validação`)
                    } catch (e) {
                        console.error(`Erro ao tentar deletar a imagem ${file.filename}:`, e)
                    }

                }
                res.status(400).json({ error: valid.error.details[0].message })
            }else{
                let newGallery = [];
                if (Array.isArray(req.files) && req.files.length > 0) {
                    const uploadedFiles = req.files as Express.Multer.File[];
                    newGallery = uploadedFiles.map(file => file.filename);
        
                    // Deletar imagens antigas do servidor se ela for diferente de null
                   if(propertId.gallery !== null){
                    const oldGallery = propertId.gallery.split(',');
                    for (const file of oldGallery) {
                         const filePath = path.join(__dirname, '../../public/gallery/', file)
                         try {
                             await fs.unlink(filePath);
                             console.log(`Imagem antiga ${file} deletada do servidor`)
                         } catch (e) {
                             console.error(`Erro ao deletar a imagem antiga ${file}:`, e)
                         }
                     }
                   }
                } else {
                    newGallery = propertId.gallery.split(',');
                }
                  await PropertyModel.update({...data, gallery:newGallery.length > 0 ? newGallery.join(',') : null},{where:{id}})
                  res.status(200).json({ message: 'imovel atualizado com sucesso.'})

            }
        }catch(e){
            console.error('Erro ao atualizar imóvel:', e);
            res.status(500).json({ error: 'Erro ao atualizar imóvel' });
        }

   },

    deletePropertyId:async(req:Request,res:Response)=>{
        try{
            const {id}=req.params
            const propertId=await PropertyModel.findByPk(id) as IPropertyModel
            const galleryStrings:string[]=propertId.gallery.split(',') //convertendo string em array
            
            try {
                // Usando um loop assíncrono para deletar os arquivos
                for (const file of galleryStrings) {
                    const filePath = path.join(__dirname, '../../public/gallery/', file)
                    try {
                        const exists = await fs.access(filePath).then(() => true).catch(() => false)
                        if (exists) {
                            await fs.unlink(filePath)
                            console.log(`Imagem ${file} deletada do servidor`)
                        } else {
                            console.warn(`Arquivo ${file} não encontrado no caminho: ${filePath}`)
                        }
                    } catch (e) {
                        console.error(`Erro ao deletar a imagem ${file}:`, e)
                    }
                }
            } catch (e) {
                console.error('Erro ao processar galeria:', e)
            }
            await PropertyModel.destroy({where:{id}})
            res.status(200).json('imóvel deletado')
     }catch(e){
        res.json(e)
        console.log(e)
     }
    
        
    }
}

