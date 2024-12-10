import model from "./model.js";

export function addAttempt(attemptData) {
    return model.create(attemptData);
}

export function fetchLastAttempt(quizId, uid) {
    // return model.findOne({ studentId: uid, quizId: quizId }).sort({ createdAt: -1 }); // Use createdAt
    return model.find({ studentId: uid, quizId: quizId }).sort({ createdAt: -1 });
}