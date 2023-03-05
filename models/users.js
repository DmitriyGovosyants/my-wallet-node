const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

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
    accounts: [{
      type: Schema.Types.ObjectId,
      ref: 'accounts',
    }],
    categories: [{
      type: Schema.Types.ObjectId,
      ref: 'categories',
    }],
    settings: {
      mainCurrency: {
        type: String,
        default: '',
      },
      
    }
  },
  { versionKey: false, timestamps: true }
);


userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = model('user', userSchema);

module.exports = User;
