import mongoose from 'mongoose';
/**
 * @swagger
 * components :
 *  schemas :
 *    createAgencyInput :
 *      type : object
 *      requied :
 *          - name
 *          - address1
 *          - state
 *          - city
 *          - phoneNumber
 *      properties :
 *        name :
 *          type :string
 *          default : Deva Saikia
 *        address1 :
 *          type :string
 *          default : Hatigaon
 *        state :
 *          type :string
 *          default : Assam
 *        city :
 *          type :string
 *          default : Guwahati
 *        phoneNumber :
 *          type :string
 *          default : 9898767779
 *    createAgencyResponse :
 *      type : object
 *      properties :
 *        name :
 *          type :string
 *        address1 :
 *          type :string
 *        state :
 *          type :string
 *        city :
 *          type :string
 *        phoneNumber :
 *          type :string
 *
 *
 *
 */

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
    timestamps: true,
  }
);

const Agency = mongoose.model('Agency', agencySchema);

export default Agency;
