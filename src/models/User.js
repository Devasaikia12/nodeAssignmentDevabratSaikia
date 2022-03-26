import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import validator from 'validator';
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error('Email is not valid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(val) {
      if (val.toLowerCase().includes('password')) {
        throw new Error('Password filed cant not contain password');
      }
    },
  },
});

userSchema.methods.macthPassword = async function (inputPassword) {
  return bcryptjs.compare(inputPassword, this.password);
};

// has password once password get updated
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
