import { Schema, model } from "mongoose";


const authUserSchema = new Schema<IAuthUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    userId: { type: String, required: true }
})

export interface IAuthUser {
    username: string
    password: string
    userId: string
}



export default model<IAuthUser>("Auth-User", authUserSchema)