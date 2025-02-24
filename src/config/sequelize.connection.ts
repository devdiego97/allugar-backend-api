import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config()

export const sequelizeConnect=new Sequelize(
    process.env.BD_NAME as string,
    process.env.BD_USER as string,
    process.env.BD_PASS as string,

    {
        dialect:'mysql',
        port:parseInt(process.env.BD_PORT as string)
    }

)