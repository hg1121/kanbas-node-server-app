import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
// make the DAO function available as a RESTful Web API

export default function UserRoutes(app) {

  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
};

  const findAllUsers = async (req, res) => {
    const { role, name} = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
   if (currentUser && currentUser._id === userId) {
     req.session["currentUser"] = { ...currentUser, ...userUpdates };
   }
    res.json(currentUser);
  };

  const signup = async (req, res) => {
    console.log('in here', req.body)
    const user = await dao.findUserByUsername(req.body.username);
    console.log("user", user);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = async(req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const signout = (req, res) => {
    req.session.destroy();
    // currentUser = null;
    res.sendStatus(200);
  };

  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = await courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  const findCoursesForUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (currentUser.role === "ADMIN") {
      const courses = await courseDao.findAllCourses();
      res.json(courses);
      return;
    }
    let { uid } = req.params;
  
    if (uid === "current") {
      uid = currentUser._id;
    }
    const courses = await enrollmentsDao.findCoursesForUser(uid);
    // console.log(courses);
    res.json(courses);
  };
  app.get("/api/users/:uid/courses", findCoursesForUser);
 
  
  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = await courseDao.createCourse(req.body);
    // console.log("currentUser", "newCourse", currentUser, newCourse)
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  //enroll and unenroll user from course using userId and courseId
  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.send(status);
  };
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);

  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    console.log('in unenrollUserFromCourse', uid, cid);
    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse); 

  // Unenroll all users from a deleted course
  app.delete("/api/users/:uid/courses/:courseId/enrollments", async (req, res) => {
    const { courseId } = req.params;

    try {
      // Call the function to remove all enrollments for the course
      const result = await enrollmentsDao.unenrollUsersFromDeletedCourse(courseId);

      // Optionally log the result for debugging
      // console.log(`Deleted ${result.deletedCount} enrollments for course ${courseId}`);

      res.status(200).send({ message: `Successfully removed enrollments for course ${courseId}` });
    } catch (error) {
      // console.error("Error unenrolling users from course:", error);
      res.status(500).send({ error: "Failed to unenroll users from course" });
    }
  });

  // Route to check if a user is enrolled in a course
  app.get("/api/users/:uid/courses/:cid/enrolled", async (req, res) => {
    const { uid, cid } = req.params;
    try {
      const isEnrolled = await enrollmentsDao.checkEnrollment(uid, cid);
      res.json({ enrolled: isEnrolled }); // Return a JSON response
    } catch (error) {
      console.error("Error checking enrollment:", error);
      res.status(500).send("Internal Server Error");
    }
  });


  app.post("/api/users/current/courses", createCourse);
  // app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
