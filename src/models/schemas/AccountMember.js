import { Schema, ObjectId } from 'mongoose';

const Assignation = new Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { _id: false }
);

const AccountMember = new Schema(
  {
    assignation: {
      type: Assignation,
      required: true,
    },
    user: { type: ObjectId, ref: 'User', required: true },
  },
  { _id: false }
);

export default AccountMember;
