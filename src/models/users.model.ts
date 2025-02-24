import { DataTypes, Model } from "sequelize";
import { sequelizeConnect } from "../config/sequelize.connection";



export interface IUserModel extends Model{
    id:number,
    name:string,
    photo:string | null,
    lastname:string,
    tel:string,
    email:string,
    password:string,
    rg:string,
    cpf:string,
    type:'Inquilino' | 'Proprietario' | string
}

export const UserModel=sequelizeConnect.define<IUserModel>('UserModel',
  {  id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
    },
    photo:{
        type:DataTypes.STRING,
        allowNull:true
    },
    lastname:{
        type:DataTypes.STRING,
    },
    tel:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING,
    },
    password:{
        type:DataTypes.STRING,
    },
    rg:{
        type:DataTypes.STRING,
    },
    cpf:{
        type:DataTypes.STRING,
    },
    type:{
        type:DataTypes.STRING,
    }},
    {
        tableName:'users',timestamps:false
    }
)