import { Schema, model } from 'mongoose';
import AccountMember from './schemas/AccountMember';

// TODO: add pagination

const OperationHistory = new Schema({
  createDate: { type: Date, default: Date.now, required: false },
  account: { type: String, required: true },
  details: { type: String, required: true },
  user: AccountMember,
});

export default model('OperationHistory', OperationHistory);
