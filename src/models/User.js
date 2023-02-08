import { Schema, model } from 'mongoose';
// paginate
import roles from '../constants/roles';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    required: false,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    required: false,
  },
  active: {
    type: Boolean,
    required: false,
    default: true,
  },
  role: {
    type: String,
    required: true,
    default: roles.USER,
  },
  englishLevel: {
    type: String,
    required: false,
  },
  techSkills: [
    {
      type: String,
      required: false,
    },
  ],
  resumeLink: { type: String, required: false },
});

export default model('User', UserSchema);
