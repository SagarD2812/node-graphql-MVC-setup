import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs';

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    status: {
      type: Number,
    },
  

  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

roleSchema.index({ email: 1 });



const roleModel = mongoose.model('roles', roleSchema);
export default roleModel;
