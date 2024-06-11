import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
    name: {
        type: String,
        required: true
    }, 
email: {
    type: String, 
    required: true,
    unique: true,
    validate: {
        validator: function(v:string) {
            return /\S+@\S+\.\S+/.test(v)
        } ,
         message: props => `${props.value} is not a valid email!`
    }, 

    trim:true
},
password: {
    type: String,
    required: true, 
    select: false
},
phone:{
    type: String,
    required: [true, 'User phone number required'],
    unique: true,
    trim:true,
    validate: {
        validator: function(v:string) {
          return /\d{4}\d{3}\d{4}/.test(v); // Bangladeshi phone number 11 digits with 0;
        },
        message: props => `${props.value} is not a valid phone number!`
      },
   
    
},
address:{
    type: String, 
    required: [true, 'Address is required']
},
role: {
    type: String,
    default: "user",
    enum: ["user", "admin"]   
}
}, {timestamps:true})



export const User = model<TUser>("User", userSchema);