import mongoose, { Schema,model,models } from "mongoose";
import { User } from "./user";


export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 720,
}as const;
export interface Video {
    title: string;
    description: string;
    Videourl: string;
    thumbnailurl: string;
    controls: boolean;
    user: User;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    transformation?:{
        height: number;
        width: number;
        quality: number;
    }
} 

const videoschema = new Schema<Video>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        Videourl: {
            type: String,
            required: true,
            unique: true,
        },
        controls: {
            type: Boolean,
            default: true,
        },
        thumbnailurl: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        transformation: {
            height:{
                type: Number,
                default: VIDEO_DIMENSIONS.height,
            },
            width: {
                type: Number,
                default: VIDEO_DIMENSIONS.width,
            },
            quality: {
                type: Number,
                min:1,
                max:100
            }
        },
    },
    { timestamps: true }
);

const video = models?.Video || model<Video>("Video", videoschema);
export default video;