import express from "express"
const routerUser = express.Router()

import {createUser, updateUser, deleteUser, getUser}  from '../../controllers/users/user.js'


const path = '/api/users'

routerUser.get(`${path}/:id`, getUser)
routerUser.post(`${path}/create`,  createUser)
routerUser.put(`${path}/update/:id`, updateUser)
routerUser.delete(`${path}/delete/:id`, deleteUser)

export default routerUser