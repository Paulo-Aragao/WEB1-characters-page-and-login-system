import {Schema,model} from "mongoose";

const userSchema = new Schema({
    email: String,
    level: Number,
    cash: Number,
    cards: [],
})

export default model("User",userSchema);