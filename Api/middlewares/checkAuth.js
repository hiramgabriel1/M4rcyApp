import { VerifyToken } from "../helpers/generateToken.js"

const checkAuthUser = async (req, res, next) => {
    try {

        const authorization = req.get('Authorization')

        let token

        if (authorization && authorization.toLowerCase().startsWith('bearer')) {

            token = authorization.split(' ').pop()
            console.log(token);
        }
        const tokenData = await VerifyToken(token)


        if (tokenData.id) {
            next()
        }

    } catch (error) {
        res.status(403).json({ error: 'You not have authorization' })
    }

}

export default checkAuthUser