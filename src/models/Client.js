import mongoose from 'mongoose';

/**
 * @swagger
 * components :
 *  schemas :
 *    createClientInput :
 *      type : object
 *      requied :
 *          - name
 *          - email
 *          - phoneNumber
 *          - totalBill
 *      properties :
 *        name :
 *          type :string
 *          default : Deva Saikia
 *        email :
 *          type :string
 *          default : deva@example.com
 *        phoneNumber :
 *          type :number
 *          default : 9898769999
 *        totalBill :
 *          type :number
 *          default : 654321
 *    createClientResponse :
 *      type : object
 *      properties :
 *        name :
 *          type :string
 *        email :
 *          type :string
 *        phoneNumber :
 *          type :number
 *        totalBill :
 *          type :number
 *
 *
 */

/**
 * @swagger
 * components :
 *  schemas :
 *    createClientUpdate :
 *      type : object
 *      properties :
 *        name :
 *          type :string
 *          default : D Saikia
 *        email :
 *          type :string
 *          default : deva123@example.com
 *        phoneNumber :
 *          type :number
 *          default : 9898769999
 *        totalBill :
 *          type :number
 *          default : 655567
 *    createClientResponse :
 *      type : object
 *      properties :
 *        name :
 *          type :string
 *        email :
 *          type :string
 *        phoneNumber :
 *          type :number
 *        totalBill :
 *          type :number
 *
 *
 */

const clientSchema = mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true,
      default: Date.now().toString(),
    },
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
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
