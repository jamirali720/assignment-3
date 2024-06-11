import { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
email: {
    type: String, 
    required: true,
    unique: true,
    trim:true
},
password: {
    type: String,
    required: true, 
    select: false
},
phone:{
    type: String,
    required: true,
    unique: true,
    trim:true,
    validate: {
        validator: function(v :string) {
            return /\d{10}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
    }
},
address:{
    type: String, 
    required: true
},
role: {
    type: String,
    default: "user",
    enum: ["user", "admin"]   
}
}, {timestamps:true})