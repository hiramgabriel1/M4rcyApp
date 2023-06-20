import { GenerateToken } from "../../helpers/generateToken.js";
import { comparePassword } from "../../helpers/handleBycript.js";
import User from "../../models/user.model.js";

const Login = async (req, res) => {
    const { email, password } = req.body
    try {
        const userExist = await User.findOne({ where: { email } })


        if (!userExist) {
            res.status(404).json({ error: 'credentials invalid' })
            return
        }

        const passwordCorrect = await comparePassword(password, userExist.dataValues.password)


        if (!passwordCorrect) {
            res.status(404).json({ error: 'credentials invalid' })
            return
        }
        const {id} = userExist.dataValues
        const token =  await GenerateToken(id)
  
        
        
        res.status(200).json({userExist, token})

    } catch (error) {
        res.status(500).json({ error: 'Error internal in the  server' })
    }
}

export default Login