import { model, Schema } from 'mongoose';

const messageSchema = new Schema({
  title: { type: String, required: true },
  timestamp: { type: Date, required: true },
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model('Message', messageSchema);