import { model, Schema } from 'mongoose';

const messageSchema = new Schema({
  title: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

messageSchema.virtual('timestamp_formatted').get(function () {
  const date: Date = this.timestamp;
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as Intl.DateTimeFormatOptions;
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
});

export default model('Message', messageSchema);
