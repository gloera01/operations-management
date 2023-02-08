import { Schema, model } from 'mongoose';
import AccountMember from './schemas/AccountMember';

const Account = new Schema({
  name: { type: String, required: true },
  client: { type: String, required: true },
  personInCharge: { type: String, required: true },
  members: [AccountMember],
});

export default model('Account', Account);
