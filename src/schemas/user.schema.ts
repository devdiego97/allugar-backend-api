import j from 'joi'

export const userSchema=j.object().keys({
    name:j.string().trim().min(4).max(50).required(),
    lastname:j.string().trim().min(4).max(50).required(),
    tel:j.string().pattern(/^\d{10,15}$/).trim().min(4).max(50).required(),
    email:j.string().email().trim().min(4).max(50).required(),
    password:j.string().trim().min(11).max(15).required(),
    rg:j.string().min(7).max(14).regex( /^\d{7,14}$/).message('RG inválido').required(),
    cpf:j.string().min(11).max(11).regex(/^\d{11}$/).message('CPF inválido').required(),
    type:j.string().trim().min(4).max(50).required(),
})


export const userSchemaLogin=j.object().keys({
    email:j.string().email().trim().min(4).max(50).required(),
    password:j.string().trim().min(11).max(15).required(),
    type:j.string().trim().min(4).max(50).required(),
})

export const userSchemaUpdate=j.object().keys({
    name:j.string().trim().min(4).max(50).optional(),
    photo:j.string().trim().min(13).max(250).optional(),
    lastname:j.string().trim().min(4).max(50).optional(),
    tel:j.string().pattern(/^\d{10,15}$/).trim().min(4).max(50).optional(),
    email:j.string().email().trim().min(4).max(50).optional(),
    password:j.string().trim().min(11).max(15).optional(),
    rg:j.string().min(7).max(14).regex( /^\d{7,14}$/).message('RG inválido').optional(),
    cpf:j.string().min(11).max(11).regex(/^\d{11}$/).message('CPF inválido').optional(),
    type:j.string().trim().min(4).max(50).optional(),
}).unknown(true)

