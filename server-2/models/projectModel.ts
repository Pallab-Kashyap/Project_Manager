import mongoose, { Schema, Document } from "mongoose";

export interface ProjectSchema extends Document {
    projectName: string,
    userId: Schema.Types.ObjectId,
    description: string,
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
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'password is required'],
        select: false
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String
    }
},
{ timestamps: true }
)



const projectModel = mongoose.model<ProjectSchema>('User', projectSchema)

export default projectModel
