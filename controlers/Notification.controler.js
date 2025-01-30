import Notificaton from "../models/notification.model.js"
import User from "../models/user.model.js"


export const isUserAvailable = (availibility) => {
    if (!Array.isArray(availibility) || availibility.length === 0) {
        return false; // No availability set
    }

    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentFormatted = `${currentHour.toString().padStart(2, "0")}:${currentMinutes.toString().padStart(2, "0")}`;

    return availibility.some(slot => {
        return currentFormatted >= slot.start && currentFormatted <= slot.end;
    });
};


export const sendNotification = async (req, res) => {

    try {
        const { recipients, message, isCritical } = req.body
        const sender = req.user._id

        if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
            return res.status(400).json({
                message: "Recipients list is required"
            })
        }

        if (!message || message.trim() === "") {
            return res.status(400).json({
                message: "Message cannot be empty"
            })
        }

        const users = await User.find({ _id: { $in: recipients } })
        if (users.length !== recipients.length) {
            return res.status(400).json({
                message: "One or More recepients not found"
            })
        }

        const notifications = []

        for (const user of users) {
            let status = 'queued'
            let deliveryTime = null

            if (isCritical || isUserAvailable(user.Availibility)) {
                status = 'delivered'
                deliveryTime = new Date()
            }


            const notification = new Notificaton({
                sender,
                recipients: [user._id],
                message,
                status,
                isCritical,
                deliveryTime
            })

            notifications.push(notification)
        }

        await Notificaton.insertMany(notifications)

        return res.status(201).json({
            message: "Notification(s) sent successfully"
        })

    } catch (err) {

        console.error("Error Sending the notification : ", err)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const sendAdminNotifications = async (req, res) => {

    try {
        const { recipients, message, isCritical } = req.body
        const adminId = req.user._id

        if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
            return res.status(400).json({
                message: "Recepients list is required"
            })
        }

        if (!message || message.trim() === "") {
            return res.status(400).json({
                message: "Message cannot be empty"
            })
        }

        const users = await User.find({ _id: { $in: recipients  }})

        if(users.length !== recipients.length){
            return res.status(400).json({
                message: "One or more recipients not found"
            })
        }

        const notifications = []

        for(const user of users){
            let status = "queued"
            let deliveryTime = null

            if(isCritical || isUserAvailable(user.Availibility)){
                status = "delivered"
                deliveryTime = new Date()
            }

            const notification = new Notificaton({
                sender: adminId,
                recipients: [user._id],
                message,
                isCritical,
                status,
                deliveryTime
            })

            notifications.push(notification)
        }

        await Notificaton.insertMany(notifications)

        return res.status(200).json({
            message: "Notification(s) sent successfully",
            notifications
        })


    } catch (err) {
        console.error("Error sending admin notification:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserNotifications = async (req, res) => {

    try{
           const userId = req.user._id

           const notifications = await Notificaton.find({ recipients: userId }).sort({ createdAt: -1 }).select("-recipients")

           return res.status(200).json({
            notifications
           })

    }catch(err){
        console.error("Error fetching user notifications:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllNotifications = async (req, res) => {

    try{
        let { isCritical } = req.query

        let filter = {}

        if(isCritical !== undefined){
            filter.isCritical = isCritical === "true"
        }

        const notifications = await Notificaton.find(filter).populate("sender", "Name email").sort({ createdAt: -1 })

        return res.status(200).json({
            notifications
        })

    }catch(err){
        console.error("Error fetching all notifications:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


