import mongoose, { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  membership: boolean;
  isAdmin?: boolean;
}

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  membership: { type: Boolean, required: true, default: false },
  isAdmin: { type: Boolean },
});

userSchema.virtual('fullName').get(function () {
  return `${this.lastName}, ${this.firstName}`;
});

export default model<IUser>('User', userSchema);
