import { model, Schema } from 'mongoose';

const Permission = new Schema({
  role: { type: String, required: true },
  description: { type: String, required: true },
});

export default model('Permission', Permission);
