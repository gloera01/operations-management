import { Schema } from 'mongoose';

const AccountMember = new Schema({
  assignationStartDate: {
    type: Date,
    required: false,
  },
  assignationEndDate: { type: Date, required: false },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export default AccountMember;
