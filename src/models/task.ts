import { Schema, model } from 'mongoose';
import { Task } from '../interfaces/models/task';

const taskSchema = new Schema<Task>(
  {
    title: {
      type: String,
      required: [true, 'A Task must have a title'],
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ['Todo', 'InProgress', 'Completed'],
        message: 'Task status must be either Todo, InProgress or Completed',
      },
      trim: true,
      default: 'Todo',
    },
    type: {
      type: String,
      enum: {
        values: ['Task', 'Subtask'],
        message: 'Task type must be either Task or Subtask',
      },
      trim: true,
      default: 'Task',
    },
    subTasks: [
      {
        type: String,
        ref: 'Task',
      },
    ],
    completedAt: Date,
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

taskSchema.post('findOneAndUpdate', async function (doc) {
  // Marking task as completed or uncompleted
  if (doc.status == 'Completed') doc.completedAt ||= new Date();
  else doc.completedAt = undefined;

  await doc.save();
});

export default model<Task>('Task', taskSchema);
