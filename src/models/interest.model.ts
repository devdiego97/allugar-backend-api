import { ForeignKey } from './../../node_modules/sequelize/types/model.d';
import { DataTypes, Model } from "sequelize";
import { PropertyModel } from "./propertys.model";
import { UserModel } from './users.model';
import { sequelizeConnect } from '../config/sequelize.connection';


export interface IInterestModel extends Model{
    id:number,
    idproperty:number,
    iduser:number,
    message:string,
    interestedate:Date
}

export const InterestModel=sequelizeConnect.define<IInterestModel>('InterestModel',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }
    ,
    idproperty:{
        type:DataTypes.INTEGER
    },
    iduser:{
        type:DataTypes.INTEGER
    },
    message:{
        type:DataTypes.STRING
    },
    interestdate:{
        type:DataTypes.DATE
    },

},
{
    tableName:'interests',timestamps:false
}

)

UserModel.belongsToMany(PropertyModel, { through: InterestModel, foreignKey: 'iduser'});
PropertyModel.belongsToMany(UserModel, { through: InterestModel, foreignKey: 'idproperty'});
InterestModel.belongsTo(UserModel, { foreignKey: 'iduser',as:'interessado'});
InterestModel.belongsTo(PropertyModel, { foreignKey: 'idproperty',as:'propriedade'  });