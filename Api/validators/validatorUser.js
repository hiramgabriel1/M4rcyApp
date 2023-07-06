
import User from '../models/user.model.js'


const validateEMail = async (email) => {
    const user = await User.findOne({ where: { email } })
   
    if (user) {
      
        return true
    }
}
const validatePassWord = (password) => {
   
    
    if (password.length < 8) { return true }
}

export { validateEMail, validatePassWord }
