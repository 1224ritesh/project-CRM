import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    memberID: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: false,
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


// compare the password with the password in the database while logging in 
// bcrypt compare method to compare the password with the password in the database.
// didn't use arrow function here because of this keyword which will refer to the current user. 
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}






// Creating a model
// 1st param: name of the model
// 2nd param: schema of the model
const User = mongoose.model("User", userSchema);

export default User;