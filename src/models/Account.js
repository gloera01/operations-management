import { Schema, model, ObjectId } from 'mongoose';
import AccountMember from './schemas/AccountMember';

const Account = new Schema({
  name: { type: String, required: true },
  client: { type: String, required: true },
  operationsManager: { type: ObjectId, required: true, ref: 'User' },
  members: [AccountMember],
});

export default model('Account', Account);
