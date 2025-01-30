import express from 'express'
import { Login, Logout, profileDetails, SignUp, updateProfile } from '../controlers/user.controler.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/signup', SignUp)

router.post('/login', Login)

router.post('/logout', Logout)

router.get('/getProfile',protectRoute ,profileDetails) 

router.put('/updateProfile', protectRoute, updateProfile)

export default router