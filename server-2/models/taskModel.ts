import mongoose, { Schema, Document } from "mongoose";


export interface TaskSchema extends Document {
    projectId: Schema.Types.ObjectId,
    parentId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    taskName: string,
    startDate: Date,
    endDate: Date,
}

const taskSchema: Schema<TaskSchema> = new Schema({
    taskName: {
        type: String,
        required: [true, 'task name required'],
    },
    projectId: {
        type: Schema.Types.ObjectId,
        required: [true, 'projectId is required']
    },
    parentId: {
        type: Schema.Types.ObjectId,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'creatorId required']
    },
    startDate: {
        type: Date,
        default: Date.now()
    },
    endDate: {
        type: Date
    }
},
{ timestamps: true }
)

const taskModel = mongoose.model<TaskSchema>('Task', taskSchema)

export default taskModel