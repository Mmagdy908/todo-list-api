import { Schema, model } from 'mongoose';
import { User } from '../interfaces/models/user';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';

const userSchema = new Schema<User>(
  {
    firstName: {
      type: String,
      required: [true, 'A user must have a first name'],
    },
    lastName: {
      type: String,
      required: [true, 'A user must have a last name'],
    },
    email: {
      type: String,
      required: [true, 'A user must have an email'],
      unique: [true, 'This email already exists'],
      validate: {
        validator: isEmail,
        message: 'This email is invalid',
      },
    },
    password: String,
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre('save', async function (next) {
  // only encrypt password if it is modifie
  if (!this.isModified('password')) return next();

  // encrypt password
  this.password = await bcrypt.hash(this.password, process.env.SALT || 12);

  next();
});

export default model<User>('User', userSchema);
