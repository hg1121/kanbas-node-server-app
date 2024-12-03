import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignment/dao.js";
import * as quizzesDao from "../Quizzes/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js"

export default function CourseRoutes(app) {
  // ****** courses routes
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    console.log("deleteCourseId", courseId);
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });

  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
    }
    res.json(course);
  }); 

  // ****** people
  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };
  app.get("/api/courses/:cid/users", findUsersForCourse);

  // ****************  module routes
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  });

  // **************** assignments routes
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await assignmentsDao.findAssignmentsOfCourse(courseId);
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/assignments/:assignmentId", async (req, res) => {
    // console.log("new Assignment:", req.body);
    const newAssignment = await assignmentsDao.createAssignment(req.body);
    res.send(newAssignment);
  });

  app.put("/api/courses/:courseId/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = await assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
    res.send(status);
  });

  app.delete("/api/courses/:courseId/assignments", async (req, res) => {
    // console.log('here');
    const { assignmentId } = req.body;
    // console.log(assignmentId);
    if (!assignmentId) {
        return res.status(400).json({ error: "assignmentId is required" });
    }
    const status = await assignmentsDao.deleteAssignment(assignmentId);
    res.send(status);
});


// ******quizzes routes
app.post("/api/courses/:courseId/quizzes", (req, res) => {
  const newQuiz = quizzesDao.createQuiz(req.body);
  res.json(newQuiz);
});

app.get("/api/courses/:courseId/quizzes/:quizId", (req, res) => {
  const quiz = quizzesDao.findQuizByQuizId(req.params.quizId);
  res.json(quiz);
})

app.get("/api/courses/:courseId/quizzes", (req, res) => {
  const quizzes = quizzesDao.findQuizzesByCourseId(req.params.courseId);
  res.json(quizzes);
});

app.put("/api/courses/:courseId/quizzes/:quizId", (req, res) => {
  const updatedQuiz = quizzesDao.updateQuiz(req.params.quizId, req.body);
  res.json(updatedQuiz);
});

app.delete("/api/courses/:courseId/quizzes/:quizId", (req, res) => {
  quizzesDao.deleteQuiz(req.params.quizId);
  res.sendStatus(204);
});

}
