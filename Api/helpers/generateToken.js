import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const GenerateToken = async (id) => {
    return jwt.sign(
        {
            id: id
        },
        process.env.jwtSecretKey,
        {
            expiresIn: '2h'
        }

    )
}

const VerifyToken = async (token) => {
    try {

        return jwt.verify(token, process.env.jwtSecretKey)

    } catch (error) {

        return null
    }

}
export { GenerateToken, VerifyToken }