import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    // quizId: { type: String, required: true },
    courseId: { type: String, required: true },
    title: { type: String, required: true },
    quizType: { type: String, required: true },
    points: { type: Number, required: true },
    description: String,
    assignmentGroup: { type: String },
    shuffleAnswers: { type: Boolean, default: false },
    timeLimit: { type: Number },
    multipleAttempts: { type: Boolean, default: false },
    howManyAttempts: { type: Number },
    showCorrectAnswers: { type: String },
    accessCode: { type: String },
    oneQuestionAtATime: { type: Boolean, default: false },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: { type: Date },
    availableDate: { type: Date },
    untilDate: { type: Date },
    published: { type: Boolean, default: false },
    questions: [
      {
        title: { type: String, required: true },
        type: { type: String, enum: ["Multiple Choice", "True/False", "Fill in the Blank"], required: true },
        points: { type: Number, required: true },
        questionDescription: { type: String, required: true },
        choices: [String],
        correctAnswer: [String],
      },
    ],
  },
  { collection: "quizzes" }
);
export default quizSchema;