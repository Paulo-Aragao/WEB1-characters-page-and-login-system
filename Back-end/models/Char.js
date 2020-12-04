import {Schema,model} from "mongoose";

const charSchema = new Schema({
    thumbnail: String,
    description: String,
    
})

export default model("Char",charSchema);