import m from 'multer'
import p from 'path'



const storage=m.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/imgs')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now() + p.extname(file.originalname))
    }
})


export const upload=m({storage:storage})