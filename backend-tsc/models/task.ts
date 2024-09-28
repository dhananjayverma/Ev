// models/task.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  completed: boolean;
  items: string[];
}

const taskSchema: Schema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  items: { type: [String], default: [] },
}, {
  timestamps: true,
});

export const Task = mongoose.model<ITask>('Task', taskSchema);
