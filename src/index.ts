import { DotenvConfigOptions } from './../node_modules/dotenv/lib/main.d';
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes';
import helmet from  'helmet'

dotenv.config()
const api=express()
api.use(helmet())
api.use(cors({origin:'*'}))
api.use(express.json())
api.use(express.urlencoded({extended:true}))
api.use(routes)
api.listen(process.env.PORT || '3000' ,()=>console.log(`http://localhost:${process.env.PORT}`))