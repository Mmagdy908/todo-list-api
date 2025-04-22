import { Schema, model } from 'mongoose';
import { Workspace } from '../interfaces/models/workspace';

const workspaceScheme = new Schema<Workspace>(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'a workspace must have a title'],
    },

    // user: {
    //   type: String,
    //   ref: 'User',
    //   required: [true, 'a workspace must have a user'],
    // },

    tasks: [String],
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true }
);

export default model<Workspace>('Workspace', workspaceScheme);
