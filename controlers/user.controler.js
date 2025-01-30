import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'

export const SignUp = async (req, res) => {

    const { Name, email, password } = req.body

    try {
        if (!Name || !email || !password) {
            return res.Status(400).json({
                message: "All fields are required"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                "json": "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            Name,
            email,
            password: hashedPassword
        })

        if (newUser) {

            generateToken(newUser._id, res)

            await newUser.save()

            res.status(201).json({
                message: "Signup Successfull",
                NewUser: {
                    Name: newUser.Name,
                    email: newUser.email,
                    role: newUser.role,
                    mobileNumber: newUser.mobileNumber,
                    Availibility: newUser.Availibility,
                    Bio: newUser.Bio
                }
            })
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }
    }
    catch (err) {
        console.log("Error in Signup", err)
        res.status(500).send('Internal server error')
    }
}

export const Login = async (req, res) => {

    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(400).json({
                message: "You need to Signup first"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(existingUser._id, res)

        res.status(200).json({
            message: "Login Successful",
            LoggedInUser: {
                _id: existingUser._id,
                Name: existingUser.Name,
                email: existingUser.email,
                role: existingUser.role,
                mobileNumber: existingUser.mobileNumber,
                Availibility: existingUser.Availibility,
                Bio: existingUser.Bio
            }
        });

    }
    catch (err) {
        console.log("Error in Login", err)
        res.status(500).send('Internal server error')
    }
}

export const Logout = async (req, res) => {

    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({
            message: "Logged out successfully"
        })
    }
    catch (err) {
        console.log("Error in Logout", err)
        res.status(500).send('Internal server error')
    }
}

export const updateProfile = async (req, res) => {

    const { Name, mobileNumber, Bio, Availibility, role } = req.body

    try {
        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(400).send("User Not Found")
        }

        if (!Name && !mobileNumber && !Bio) {
            return res.status(400).json({
                message: "Please provide any one of the fields to update"
            })
        }

        if (Name !== undefined) {
            user.Name = Name
        }

        if (mobileNumber !== undefined) {
            if (!/^\d{10}$/.test(mobileNumber)) {
                return res.status(400).json({ message: "Invalid Mobile Number. Must be 10 digits." });
            }
            user.mobileNumber = mobileNumber
        }

        if (Bio !== undefined) {
            user.Bio = Bio
        }


        if (role !== undefined) {
            if (!["general", "admin"].includes(role)) {
                return res.status(400).json({ message: "Invalid role. Role must be 'general' or 'admin'" })
            }
            user.role = role
        }

        if (Availibility !== undefined) {
            if (!Array.isArray(Availibility)) {
                return res.status(400).json({
                    message: "Availibility should be an array of time slots in 'HH:MM-HH:MM' format."
                });
            }

            const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/;

            const parsedAvailability = [];

            for (const slot of Availibility) {
                if (typeof slot === "string") {
                    if (!timeRegex.test(slot)) {
                        return res.status(400).json({
                            message: `Invalid time slot format: ${slot}. Use 'HH:MM-HH:MM' format.`
                        });
                    }

                    const [startTime, endTime] = slot.split("-");
                    parsedAvailability.push({ start: startTime, end: endTime });
                } else if (typeof slot === "object" && slot.start && slot.end) {
                    parsedAvailability.push(slot);
                } else {
                    return res.status(400).json({
                        message: `Invalid availability format: ${JSON.stringify(slot)}.`
                    });
                }
            }

            user.Availibility = parsedAvailability;
        }
        const updatedUser = await user.save()

        res.status(200).json({
            message: "User Details Updated Successfully",
            user: {
                _id: updatedUser._id,
                Name: updatedUser.Name,
                email: updatedUser.email,
                mobileNumber: updatedUser.mobileNumber,
                role: updatedUser.role,
                Bio: updatedUser.Bio,
                Availibility: updatedUser.Availibility

            }
        })
    }
    catch (err) {
        console.error("Error updating user details:", err);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const profileDetails = (req, res) => {

    try {
        res.status(200).json(req.user)
    } catch (err) {
        console.log("Error in checkAuth controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}