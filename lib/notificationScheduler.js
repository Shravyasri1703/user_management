import cron from 'node-cron'
import Notificaton from '../models/notification.model.js'
import { isUserAvailable } from '../controlers/Notification.controler.js'

export const processQueuedNotifications = async () => {

    try{

        const notifications = await Notificaton.find({ status: "queued" }).populate("recipients")

        for(const notification of notifications){
            for(const recepient of notification.recipients){
                if(isUserAvailable(recepient.Availibility)){
                    notification.status = "delivered"
                    notification.deliveryTime = new Date()
                    await notification.save()
                }
            }
        }
    }catch(err){
        console.error("Error processing queued notifications:", err)
    }
}

cron.schedule("*/5 * * * *", processQueuedNotifications)
console.log("Notification scheduler started : Checking queued notifications every 5 minutes.")