import { Schema, model, ObjectId } from 'mongoose';
import AccountMember from './schemas/AccountMember';
import mongoosePaginate from 'mongoose-paginate-v2';

const OperationHistory = new Schema({
  createDate: { type: Date, default: Date.now, required: false },
  account: { type: ObjectId, required: true, ref: 'Account' },
  details: { type: String, required: true },
  member: AccountMember,
});

OperationHistory.plugin(mongoosePaginate);

export default model('OperationHistory', OperationHistory);
