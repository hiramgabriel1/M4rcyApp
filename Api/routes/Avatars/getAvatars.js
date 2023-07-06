import expres from 'express'
const routerAvatar = expres.Router()
const path = '/api/avatars'
import getAvatars from '../../controllers/getAvatar/getAvatars.js'
routerAvatar.get(`${path}/:filename`, getAvatars)

export default routerAvatar