import { Schema, model, Document, Types } from "mongoose";

// Enum for Member Position
export enum MemberPosition {
  MEMBER = "member",
  ADMIN = "admin",
  OWNER = "owner",
}

// Interface for TaskMember document
interface ITaskMember extends Document {
  taskId: Types.ObjectId; // References the Task model
  userId: Types.ObjectId; // References the User model
  position: MemberPosition; // Position in the task
}

// Mongoose Schema
const TaskMemberSchema = new Schema<ITaskMember>(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task", // Reference to Task model
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    position: {
      type: String,
      enum: Object.values(MemberPosition),
      default: MemberPosition.MEMBER,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Mongoose Model
const taskMemberModel = model<ITaskMember>("TaskMember", TaskMemberSchema);

export default taskMemberModel;
