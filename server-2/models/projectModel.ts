import mongoose, { Schema, Document } from "mongoose";

export enum ProjectStatus {
    IN_PORGRESS = 'In Progress',
    HOLD = 'ON Hold',
    COMPLETED = 'Completed',
    NOT_STARTED = 'Not Started'
}

export interface ProjectSchema extends Document {
    projectName: string,
    userId: Schema.Types.ObjectId,
    // description: string,
    startDate: Date,
    endDate: Date,
    status: string,
}

const projectSchema: Schema<ProjectSchema> = new Schema({
    projectName: {
        type: String,
        required: [true, 'userName is required']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'email is required'],
    },
    // description: {
    //     type: String,
    //     required: [true, 'password is required'],
    //     select: false
    // },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: Object.values(ProjectStatus),
        default: ProjectStatus.NOT_STARTED
    }
},
{ timestamps: true }
)


const projectModel = mongoose.models.projectModel || mongoose.model('Project', projectSchema);


export default projectModel
