import express from 'express'
import { isAdmin, protectRoute } from '../middleware/auth.middleware.js'
import { getAllNotifications, getUserNotifications, sendAdminNotifications, sendNotification } from '../controlers/Notification.controler.js'

const router = express.Router()

router.post("/send", protectRoute, sendNotification)

router.post("/admin/send", protectRoute, isAdmin, sendAdminNotifications)

router.get("/user",protectRoute, getUserNotifications)

router.get('/admin', protectRoute, isAdmin, getAllNotifications)


export default router