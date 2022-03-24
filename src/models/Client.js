import mongoose from 'mongoose';
const clientSchema = mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true,
      default: Date.now().toString(),
    },
    agencyId: {
      type: String,
      required: true,
      ref: 'Agency',
    },
    name: {
      type: String,
      required: [true, 'Name required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phoneNumber: {
      type: Number,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, 'User phone number required'],
    },
    totalBill: {
      type: Number,
      required: [true, 'Total bill required'],
    },
  },
  {
    timestamp: true,
  }
);
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const Client = mongoose.model('Client', clientSchema);

export default Client;
