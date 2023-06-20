import express from "express"
const routerUser = express.Router()

import {createUser, updateUser, deleteUser, getUser}  from '../../controllers/users/user.js'
import checkAuthUser from "../../middlewares/checkAuth.js"


const path = '/api/users'

routerUser.get(`${path}/:id`, checkAuthUser, getUser)
routerUser.post(`${path}/create`,  createUser)
routerUser.put(`${path}/update/:id`, checkAuthUser, updateUser)
routerUser.delete(`${path}/delete/:id`, checkAuthUser, deleteUser)

export default routerUser