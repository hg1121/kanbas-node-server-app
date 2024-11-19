import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignment/dao.js";

export default function CourseRoutes(app) {
  // ****** courses routes
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });

  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    dao.deleteCourse(courseId);
    res.sendStatus(204);
  });

  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    dao.updateCourse(courseId, courseUpdates);
    res.sendStatus(204);
  });

  // ****************  module routes
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });

  // **************** assignments routes
  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = assignmentsDao.findAssignmentsOfCourse(courseId);
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/assignments/:assignmentId", (req, res) => {
    console.log("new Assignment:", req.body);
    const newAssignment = assignmentsDao.createAssignment(req.body);
    res.send(newAssignment);
  });

  app.put("/api/courses/:courseId/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
    res.send(204);
  });

//   app.delete("/api/courses/:courseId/assignments", (req, res) => {
//     const { assignmentId } = req.body;
//     assignmentsDao.deleteAssignment(assignmentId);
//     res.sendStatus(204);
//   });

  app.delete("/api/courses/:courseId/assignments", (req, res) => {
    // console.log('here');
    const { assignmentId } = req.body;
    // console.log(assignmentId);
    if (!assignmentId) {
        return res.status(400).json({ error: "assignmentId is required" });
    }
    assignmentsDao.deleteAssignment(assignmentId);
    res.sendStatus(204);
});
}
