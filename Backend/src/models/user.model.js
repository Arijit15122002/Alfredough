import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true
    },
    avatar: {
        type: String, //cloudinary url
        required: true,
    },
    coverImage: {
        type: String,
    },
    writtenBlogs:{
        type: [Schema.Types.ObjectId], // Array of ObjectIds referring to Blog documents
        default: [], // Set default value to an empty array
        ref: 'Blog',
    },
    addedToFavorites:{
        type: [Schema.Types.ObjectId], // Array of ObjectIds referring to Blog documents
        default: [], // Set default value to an empty array
        ref: 'Blog',
    }

}, {timestamps: true})


//hashing password
userSchema.pre('save', async function(next) /* can't  use arrow function because arrow function doesn't have the access of 'this' keyword */ {
    if(!this.isModified("password")) return next();
    
    this.password = await bcrypt.hash(this.password, 10)
    next() 
})


//checking passowrd if  that's correct or not
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}


// generating web token
userSchema.methods.generateToken = async function() {
    const token = jwt.sign({
             _id: this._id,
             email: this.email 
            }, process.env.JWT_SECRET, { expiresIn: '7d' })

    return token;
}



export const User = mongoose.model("User", userSchema)