# User Management System with Notifications

## Introduction

This project is a User Management System built using Node.js and MongoDB, featuring user authentication, profile management, and a notification system. The application includes an Admin Panel to manage users and notifications, with a focus on security, scalability, and maintainability.

## Features

User Authentication (Sign-up, Login, Password Encryption)

Profile Management

Admin Panel for Managing Users & Notifications

User Availability-Based Notifications

Timestamps for Notifications (Sent & Received Time)

Proper Validation & Error Handling

Secure Data Handling (Encryption for Sensitive Information)



## Live Demo

🚀 Hosted on Render: Your Public Link Here

## Tech Stack

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (JSON Web Token)

Hosting: Render

# Installation & Setup

Prerequisites

Ensure you have Node.js and MongoDB installed.

### 1. Clone the Repository
```
 git clone https://github.com/your-repo/user-management.git
 cd user-management

 ```

### 2. Install Dependencies
```
npm install

```
### 3. Configure Environment Variables

Create a .env file and add:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
### 4. Run the Application

Development Mode
```
npm run dev
```
Production Mode
```
npm start
```
# API Documentation

## User Authentication

### 1. Register User

Endpoint: POST /api/users/register
Request Body:
```

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```
Response:
```

{
    "message": "User registered successfully",
    "user": {
        "_id": "123456789",
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```
### 2. Login User


Endpoint: POST /api/users/login
Request Body:
```

{
    "email": "john@example.com",
    "password": "password123"
}
```

Response:
```
{
    "message": "Login successful",
    "token": "your_jwt_token"
}
```
Notifications

### 3. Send Notification

Endpoint: POST /api/notifications/send
Request Body:
```

{
    "recipients": ["679b4b9b37b12820bbc63107"],
    "message": "Hey, let's catch up!",
    "isCritical": false
}
```
Response:
```

{
    "message": "Notification(s) sent successfully",
    "notifications": [
        {
            "sender": "679b4b9b37b12820bbc63107",
            "recipients": ["679b4b9b37b12820bbc63107"],
            "message": "Hey, let's catch up!",
            "status": "delivered",
            "isCritical": false,
            "deliveryTime": "2025-01-30T11:17:32.577Z"
        }
    ]
}
```
### 4. Fetch User Notifications

Endpoint: GET /api/notifications/user/:userId
Response:
```

{
    "notifications": [
        {
            "message": "Hey, let's catch up!",
            "status": "delivered",
            "timestamp": "2025-01-30T11:17:32.578Z"
        }
    ]
}
```
## Security & Best Practices

Passwords are hashed using bcrypt for secure storage.

JWT Authentication ensures secure access control.

Data Validation with Mongoose schemas prevents incorrect data entries.

Proper Error Handling with meaningful responses.

## Conclusion

This User Management System ensures secure authentication, user-friendly notifications, and an admin panel for seamless management.

## Screenshots

### Sign Up 

1. Signing Up using Already existing Mail
   
![Screenshot 2025-01-30 182301](https://github.com/user-attachments/assets/1300e91b-cde3-4860-b1ed-f6df4c9c4c95)

3. After Successfull Signup using new email

![Screenshot 2025-01-30 182340](https://github.com/user-attachments/assets/1caf5a39-c04b-4f8c-aafc-94ec6ba4391c)

### Login

1. Logging In using wrong Email

![Screenshot 2025-01-30 182413](https://github.com/user-attachments/assets/8392d003-325c-483f-9c92-ae85a7c10858)

2. Successful Login

![Screenshot 2025-01-30 182441](https://github.com/user-attachments/assets/aca198cb-6fd0-4113-ac35-d475e4195997) 

3. Token Generated After login
   
![Screenshot 2025-01-30 182457](https://github.com/user-attachments/assets/b86a594a-94e1-46e7-b60a-88648ff3aac9)

### Logout 
Logged OUT with cookie cleared

![Screenshot 2025-01-30 182512](https://github.com/user-attachments/assets/a732885e-d81a-4fb3-a7de-264d5aec6d14)

### Profile details
1. Fetching Profile details only after Loggin In

![Screenshot 2025-01-30 182549](https://github.com/user-attachments/assets/21d88b3d-b943-41ed-bd01-e659665838b7)

2. Updating Profile details After Loggin in

![Screenshot 2025-01-30 182623](https://github.com/user-attachments/assets/da7f0da7-9379-4e97-a2f6-8ed86dd6be9c)

![Screenshot 2025-01-30 182635](https://github.com/user-attachments/assets/c1f39978-d28d-4ec6-8cb4-dbb9f54d0c66)

### Notifications and Admin Panel

1. Trying to access all notification with general role
![Screenshot 2025-01-30 182705](https://github.com/user-attachments/assets/a8260184-fecb-4b9b-977d-b1c404d34b86)

2. Successfully Sending the Notification

![Screenshot 2025-01-30 182927](https://github.com/user-attachments/assets/072cd151-2974-4cd8-a9f6-ed06d42f047b)

3. Notification waiting in Queue as availability is Off

![Screenshot 2025-01-30 182946](https://github.com/user-attachments/assets/c3e94b28-ff8b-4161-a35c-b436e409cce4)
