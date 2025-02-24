import j from  'joi'

export const propertySchema=j.object().keys({
    idowner:j.number().required(),
    title:j.string().trim().max(80).required(),
    type:j.string().trim().max(80).required(),
    about:j.string().trim().max(300).required(),
    city:j.string().trim().max(50).required(),
    state:j.string().trim().max(2).required(),
    price:j.number().optional(),
    
})

export const propertySchemaUpdate=j.object().keys({
    title:j.string().trim().max(80).optional(),
    type:j.string().trim().max(80).optional(),
    about:j.string().trim().max(300).optional(),
    city:j.string().trim().max(50).optional(),
    state:j.string().trim().max(2).optional(),
    price:j.number().optional(),
   
}).unknown(true)
