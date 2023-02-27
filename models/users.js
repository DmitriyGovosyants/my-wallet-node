const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    name: {
      type: String,
      required: [true, 'Set your name'],
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    settings: {
      mainCurrency: {
        type: String,
        default: '',
      },
      bills: [{
        type: Schema.Types.ObjectId,
        ref: 'bills',
      }],
      categories: {
        type: Array,
        default: [],
      },
      filter: {
        bill: {
          type: String,
          default: 'all',
        },
        type: {
          type: String,
          default: 'expenses',
        },
        date: {
          type: String,
          default: 'month',
        },
      },
    }
  },
  { versionKey: false, timestamps: false }
);

// Хук, хеширует и солит пароль перед сохранением в базу
userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
