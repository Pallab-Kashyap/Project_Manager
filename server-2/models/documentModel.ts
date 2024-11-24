import mongoose, {Schema, Document} from "mongoose";

interface DocI extends Document {
    projectId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    url: string,
    publicId: string
}

const docSchema: Schema<DocI> = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'project ID missing'],
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user ID missing'],
    },
    url: {
        type: String,
        required: [true, 'URL missing'],
    },
    publicId: {
        type: String,
        required: [true, 'public ID missing']
    }
})

const docModel = mongoose.models.Doc || mongoose.model('Doc', docSchema)

export default docModel