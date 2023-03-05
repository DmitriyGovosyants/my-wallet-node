const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    type: {
      type: String,
      enum: ['expense', 'revenue'],
      required: [true, 'Set type'],
    },
    title: {
      type: String,
      required: [true, 'Set title'],
    },
    icon: {
      type: String,
      required: [true, 'Set icon'],
    },
  },
  { versionKey: false, timestamps: true }
);

const Category = mongoose.model('categories', categorySchema);

module.exports = Category;
