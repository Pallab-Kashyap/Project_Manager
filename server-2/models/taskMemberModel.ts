import mongoose, { Schema,Document, Types } from "mongoose";


export enum MemberPosition {
  MEMBER = "member",
  ADMIN = "admin",
  OWNER = "owner",
}


interface ITaskMember extends Document {
  taskId: Types.ObjectId; 
  userId: Types.ObjectId; 
  position: MemberPosition;
}


const TaskMemberSchema = new Schema<ITaskMember>(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task", 
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
  },
  {
    timestamps: true, 
  }
);


const taskMemberModel = mongoose.models.taskMemberModel || mongoose.model('TaskMemeber', TaskMemberSchema);

export default taskMemberModel;
