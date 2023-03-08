const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['expense', 'revenue'],
      required: [true, 'Set type'],
    },
    category_id: {
      type: String,
      required: [true, 'Set category'],
    },
    date: {
      type: String,
      required: [true, 'Set date'],
    },
    value: {
      type: Number,
      required: [true, 'Set value'],
    },
    comment: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;
