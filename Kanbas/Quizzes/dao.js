import Database from "../Database/index.js";
import model from "./model.js";

export function createQuiz(quizData) {
    // Database.quizzes.push(quizData);
    // return quizData;

    delete quizData._id;
    return model.create(quizData);
}

export function findQuizzesByCourseId(courseId) {
    // return Database.quizzes.filter(quiz => quiz.courseId === courseId);
    return model.find({courseId: courseId});
}

export function findQuizByQuizId(quizId) {
    // return Database.quizzes.filter(quiz => quiz._id === quizId);
    return model.findById(quizId);
}

export function updateQuiz(quizId, updates) {
    // const quiz = Database.quizzes.find(quiz => quiz._id === quizId);
    // if (!quiz) throw new Error("Quiz not found");
    // Object.assign(quiz, updates);
    // return quiz;
    return model.updateOne({ _id: quizId }, updates)
}

export function deleteQuiz(quizId) {
    // const index = Database.quizzes.findIndex(quiz => quiz._id === quizId);
    // console.log("delete index", index);
    // if (index !== -1) {
    //     Database.quizzes.splice(index, 1);
    // }
    return model.deleteOne({_id: quizId});
}