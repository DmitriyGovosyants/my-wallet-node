const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set title'],
    },
    currency: {
      type: String,
      required: [true, 'Set currency'],
    },
    startBalance: {
      type: Number,
      required: [true, 'Set start balance'],
    },
    startDate: {
      type: String,
      required: [true, 'Set start date'],
    },
    icon: {
      type: String,
      required: [true, 'Set icon'],
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'transactions',
      }],
  },
  { versionKey: false, timestamps: true }
);

const Account = mongoose.model('accounts', accountSchema);

module.exports = Account;
