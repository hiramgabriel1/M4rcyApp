import express from 'express'

import Login from '../../controllers/auth/login.auth.js'

const routerLogin = express.Router()
const path = '/api/auth/login'
routerLogin.post(`${path}`, Login )

export  default routerLogin