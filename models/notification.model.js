import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    recipients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    
    message: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["delivered", "queued"],
        default: "queued"
    },

    isCritical: {
        type: Boolean,
        default: false
    },

    timestamp: {
        type: Date,
        default: Date.now
    },

    deliveryTime: {
        type: Date,
        default: null
    }

})

const Notificaton = mongoose.model("Notification", notificationSchema)

export default Notificaton