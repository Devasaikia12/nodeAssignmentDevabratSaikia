import mongoose from 'mongoose';

const agencySchema = mongoose.Schema(
  {
    agencyId: {
      type: String,
      required: true,
      default: Date.now().toString(),
    },
    name: {
      type: String,
      required: [true, 'Name required'],
      trim: true,
    },
    address1: {
      type: String,
      required: [true, 'Address required'],
      trim: true,
    },
    address2: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City required'],
      trim: true,
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
  },
  {
    timestamp: true,
  }
);

const Agency = mongoose.model('Agency', agencySchema);

export default Agency;
