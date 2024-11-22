import mongoose, { Schema, Document, Types } from "mongoose";

export enum MemberPosition {
  MEMBER = "member",
  ADMIN = "admin",
  OWNER = "owner",
}

interface IProjectMember extends Document {
  projectId: Types.ObjectId; 
  userId: Types.ObjectId;    
  position: MemberPosition;  
  confirm: boolean
  access?: boolean;          
  completedTasks?: number;
  email?: string  
}


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
    email: {
      type: String,
      default: ''
    },
    access: {
      type: Boolean,
      default: false, 
    },
    completedTasks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, 
  }
);


const projectMemberModel = mongoose.models.projectMemberModel || mongoose.model('ProjectMember', ProjectMemberSchema);

export default projectMemberModel;
