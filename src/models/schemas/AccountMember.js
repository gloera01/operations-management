import { Schema } from 'mongoose';

const AccountMember = new Schema({
  assignedDate: {
    type: Date,
    required: false,
    default: Date.now,
  },
  assignationEndDate: { type: Date, required: true },
  name: { type: String, required: true },
});

export default AccountMember;
