import * as AttemptDao from "./dao.js";
import * as QuizDao from "../Quizzes/dao.js";

export default function AttemptRoutes(app) {
  // POST route for adding an attempt
  app.post(
    "/api/courses/:courseId/quizzes/:quizId/attempts",
    async (req, res) => {
      try {
        const { quizId } = req.params;
        const { uid, answers } = req.body;

        // Fetch the quiz
        const quiz = await QuizDao.findQuizByQuizId(quizId);
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        // Calculate score
        let score = 0;
        quiz.questions.forEach((question, index) => {
            const studentAnswer = answers.find((a) => a.questionIndex === index);
          
            if (studentAnswer) {
              // Check for Fill In the Blank type
              if (question.type === "Fill In the Blank") {
                // If any of the student's answers match any correct answer
                const isCorrect = studentAnswer.selectedOptions.some((option) =>
                  question.correctAnswer.includes(option)
                );
                if (isCorrect) {
                  score += question.points;
                }
              } else {
                // Default scoring logic for other question types
                if (
                  JSON.stringify((studentAnswer.selectedOptions || []).sort()) ===
                  JSON.stringify((question.correctAnswer || []).sort())
                ) {
                  score += question.points;
                }
              }
            }
          });

        // Save the attempt
        const attempt = await AttemptDao.addAttempt({
          studentId: uid,
          quizId: quizId,
          answers,
          score,
        });

        res.status(201).json(attempt);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to submit attempt" });
      }
    }
  );

  // GET route for fetching last attempt
  app.get(
    "/api/courses/:courseId/quizzes/:quizId/attempts/:uid",
    async (req, res) => {
      try {
        const { quizId, uid } = req.params;
        const lastAttempt = await AttemptDao.fetchLastAttempt(quizId, uid);
        // console.log("lastAttempt", lastAttempt);

        if (!lastAttempt) {
          return res.status(404).json({ message: "No attempt found" });
        }

        res.status(200).json(lastAttempt);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve attempt" });
      }
    }
  );
}
