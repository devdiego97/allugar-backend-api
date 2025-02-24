import j from 'joi'

export const InterestSchema=j.object().keys({
    iduser:j.number().required(),
    idproperty:j.number().required(),
    message:j.string().required().trim().min(5).max(100)

})