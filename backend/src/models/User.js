import mongoose from "mongoose";

// définition du schema de données pour les users
const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
        minlength: 6,
    },
    profileImage : {
        type: String,
        default: '',
    },
});

// creation du modele de données "User"
const User = mongoose.model("User", userSchema);

export default User;