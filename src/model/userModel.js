import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
      lowercase: true,
    },
 
    phone_no: {
      type: String
    },
    // password: {
    //   type: String,
    //   required: true,
    //   minlength: [8, 'Password must be more than 8 characters'],
    //   select: false,
    // },
    // passwordConfirm: {
    //   type: String,
    //   required: [true, 'Please confirm your password'],
    //   validate: {
    //     validator: function (val) {
    //       return val === this.password;
    //     },
    //     message: 'Confirm Password do not match',
    //   },
    // },


  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.index({ email: 1 });



const userModel = mongoose.model('user', userSchema);
export default userModel;
