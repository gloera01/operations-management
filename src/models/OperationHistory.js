import { Schema, model, ObjectId } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const HistoryUserData = new Schema(
  {
    email: { type: String },
    name: { type: String },
    role: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { _id: false }
);

const HistoryAccountData = new Schema(
  {
    client: String,
    name: String,
  },
  { _id: false }
);

const OperationHistory = new Schema({
  user: { type: HistoryUserData, required: true },
  account: { type: HistoryAccountData, required: true },
  details: { type: String, required: true },
  createDate: { type: Date, default: Date.now, required: false },
});

OperationHistory.plugin(mongoosePaginate);

export default model('OperationHistory', OperationHistory);
