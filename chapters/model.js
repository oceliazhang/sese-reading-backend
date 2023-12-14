import mongoose from "mongoose";
import schema from "./schema.js";
const chapterModel = mongoose.model("chapters", schema);
export default chapterModel;