import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  membership: { type: Boolean, required: true },
});

userSchema.virtual('fullName').get(function () {
  return `${this.lastName}, ${this.firstName}`;
});

export default model('User', userSchema);
