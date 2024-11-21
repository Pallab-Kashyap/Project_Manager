import { Schema, model, Document, Types } from "mongoose";
import { boolean } from "zod";

// Enum for member positions
export enum MemberPosition {
  MEMBER = "member",
  ADMIN = "admin",
  OWNER = "owner",
}

// Interface for TypeScript type safety
interface IProjectMember extends Document {
  projectId: Types.ObjectId; // References the Project model
  userId: Types.ObjectId;    // References the User model
  position: MemberPosition;  // Position in the project
  confirm: boolean
  access?: boolean;          // Access status (optional)
  completedTasks?: number;   // Count of completed tasks
}

// Mongoose Schema
const ProjectMemberSchema = new Schema<IProjectMember>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: {
      type: String,
      enum: Object.values(MemberPosition),
      default: MemberPosition.MEMBER,
      required: true,
    },
    confirm: {
      type: Boolean,
      default: false
    },
    access: {
      type: Boolean,
      default: false, // Uncomment if you want a default value
    },
    completedTasks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Mongoose Model
const projectMemberModel = model<IProjectMember>("ProjectMember", ProjectMemberSchema);

export default projectMemberModel;
