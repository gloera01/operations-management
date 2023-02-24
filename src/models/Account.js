import { Schema, model, ObjectId } from 'mongoose';
import AccountMember from './schemas/AccountMember';
import mongoosePaginate from 'mongoose-paginate-v2';

const Account = new Schema({
  name: { type: String, required: true },
  client: { type: String, required: true },
  operationsManager: { type: ObjectId, required: true, ref: 'User' },
  members: [AccountMember],
  createDate: { type: Date, required: false, default: Date.now },
  modifiedDate: { type: Date, required: false },
});

Account.plugin(mongoosePaginate);

export default model('Account', Account);
