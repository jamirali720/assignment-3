import { Schema, model } from "mongoose";
import { IUser, UserModel } from "../auth/auth.interface";
import bcrypt from "bcrypt";
import configs from "../configs";

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 3 characters"],
      select: 0,
    },
    phone: {
      type: String,
      required: [true, "User phone number required"],    
      validate: {
        validator: function (v: string) {       
          const phoneRegex = /\d{4}-\d{3}-\d{4}/
          return phoneRegex.test(v); // Bangladeshi phone number 11 digits with 0;
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

// password hashing before saving user
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(configs.saltRound));
  next();
});
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next()
});

//compare password while user login
userSchema.statics.comparePassword = async function (
  plainPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
userSchema.statics.isUserExists = async function (email) {
  return await User.findOne({ email }).select("+password");
};

export const User = model<IUser, UserModel>("User", userSchema);
