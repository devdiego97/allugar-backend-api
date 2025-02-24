

export interface IUser{
    id:number,
    name:string,
    lastName:string,
    tel:string,
    email:string,
    password:string,
    rg:string,
    cpf:string,
    type:'Inquilino' | 'Proprietário' | string
}