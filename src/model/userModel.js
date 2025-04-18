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
    password: {
      type: String,
      required: true,
      minlength: 6,
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


userSchema.index({ email: 1 });



const userModel = mongoose.model('user', userSchema);
export default userModel;
