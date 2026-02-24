import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['new', 'active', 'completed', 'failed'], default: 'new' },
  dueDate: Date
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
