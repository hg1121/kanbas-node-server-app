import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
      quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizModel' },
      answers: [
        {
          questionIndex: { type: Number }, // Store the question index from the quiz
          selectedOptions: [String], // The selected options for the question
        },
      ],
      score: { type: Number, default: 0 }, // Store the score for the attempt
      createdAt: { type: Date, default: Date.now },
    },
    { collection: 'attempts' }
  );
  
export default attemptSchema;
