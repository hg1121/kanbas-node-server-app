import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
 {
    title: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    description: String,
    points: Number,
    available: Date,
    until: Date,
    due: Date,
 },
 { collection: "assignments" }
);
export default assignmentSchema;