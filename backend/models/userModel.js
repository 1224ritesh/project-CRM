import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
    },
},
{
    timestamps: true,

});



// add middleware to encrypt the password before saving the user in the database
// there is a hooks in mongoose called pre and post.
// pre which takes two params 1st param: name of the hook, 2nd param: function to be executed before saving the user in the database.
userSchema.pre('save', async function(next){
    
    if(!this.isModified('password')){
        next();
    }
    // if the password is modified or for creating it then encrypt or hash the password and save it in to the database.
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});






// Creating a model
// 1st param: name of the model
// 2nd param: schema of the model
const User = mongoose.model("User", userSchema);

export default User;