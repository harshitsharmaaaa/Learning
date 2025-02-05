import mongoose, { Schema,model,models } from "mongoose";
import bcrypt from "bcryptjs";

export interface User {
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const userschema = new Schema<User>(

    {email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
},
    {timestamps: true}
);


userschema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = models?.User|| model<User>("User", userschema);


export default User;