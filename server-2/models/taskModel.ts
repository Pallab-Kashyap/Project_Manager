import mongoose, { Schema, Document } from "mongoose";


export interface TaskSchema extends Document {
    projectId: Schema.Types.ObjectId,
    parentId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    taskName: string,
    completed: boolean,
    priority: string,
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
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        default: 'In Progress'
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

const taskModel = mongoose.models.taskModel || mongoose.model('Task', taskSchema);

export default taskModel