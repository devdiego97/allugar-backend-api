import { IProperty } from "./property.interface";


export interface IBroker{
    id:number,
    photo:string | null,
    name:string,
    about:string,
    lastname:string,
    email:string,
    cresci:string,
    phone:string,
    propertys:IProperty[]
}