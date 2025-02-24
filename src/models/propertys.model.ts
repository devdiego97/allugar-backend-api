import { DataTypes, Model } from "sequelize";
import { UserModel } from "./users.model";
import { sequelizeConnect } from "../config/sequelize.connection";


export interface IPropertyModel extends Model{
    id:number,
    idowner:number,
    title:string,
    type:'apartamento' |'casa' | 'quitinete' | 'comercial',
    about:string,
    city:string,
    state:string,
    price:number,
    published:Date,
    gallery:string
}

export const PropertyModel=sequelizeConnect.define('PropertyModel',
  {  id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    idowner:{
        type:DataTypes.INTEGER,
    },
    title:{
        type:DataTypes.STRING,
    },
   type:{
        type:DataTypes.STRING,
        
    },
    price:{
        type:DataTypes.DECIMAL(10,2)
},
    about:{
        type:DataTypes.STRING,
    },
   city:{
        type:DataTypes.STRING,
    },
    state:{
        type:DataTypes.STRING,
    },
    published:{
        type:DataTypes.DATE,
    },
    gallery:{
        type:DataTypes.TEXT,
    },
},
    {
        tableName:'propertys',timestamps:false
    }
)

UserModel.hasMany(PropertyModel,{foreignKey:'idowner',as:'imoveis'})
PropertyModel.belongsTo(UserModel,{foreignKey:'idowner',as:'owner'})