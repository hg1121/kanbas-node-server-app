import Database from "../Database/index.js";

export function createQuiz(quizData) {
    Database.quizzes.push(quizData);
    return quizData;
}

export function findQuizzesByCourseId(courseId) {
    return Database.quizzes.filter(quiz => quiz.courseId === courseId);
}

export function findQuizByQuizId(quizId) {
    return Database.quizzes.filter(quiz => quiz.quizId === quizId);
}

export function updateQuiz(quizId, updates) {
    const quiz = Database.quizzes.find(quiz => quiz.quizId === quizId);
    if (!quiz) throw new Error("Quiz not found");
    Object.assign(quiz, updates);
    return quiz;
}

export function deleteQuiz(quizId) {
    const index = Database.quizzes.findIndex(quiz => quiz.quizId === quizId);
    console.log("delete index", index);
    if (index !== -1) {
        Database.quizzes.splice(index, 1);
    }
}