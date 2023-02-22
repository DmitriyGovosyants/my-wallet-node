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
    // birthdate: {
    //   type: String,
    //   default: null,
    // },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
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
