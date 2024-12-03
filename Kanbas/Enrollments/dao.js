// import Database from "../Database/index.js";
import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  // console.log("enrollments", enrollments);
  // return enrollments.map((enrollment) => enrollment.course);
    // Filter out enrollments where course is null
    const validEnrollments = enrollments.filter((enrollment) => enrollment.course !== null);
    return validEnrollments.map((enrollment) => enrollment.course);
 }

 export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
 }

 export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
 }
 
 export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
 }

 export function unenrollUsersFromDeletedCourse(course){
  return model.deleteMany({course: course});
 }

 export async function checkEnrollment(userId, courseId) {
  // Find an enrollment document matching the userId and courseId
  const enrollment = await model.findOne({ user: userId, course: courseId });
  return !!enrollment; // Return true if found, false otherwise
}
 
// export async function enrollUserInCourse(userId, courseId) {
// //   console.log("userId", "courseId", userId, courseId)
//   const { enrollments } = Database;
//   enrollments.push({ _id: String(enrollments.length + 1), user: userId, course: courseId });
// //   console.log("enrollments", enrollments[enrollments.length - 1]);
// }

// export async function unenrollUserFromCourse(userId, courseId) {
//     const { enrollments } = Database;
//     // Find the index of the enrollment record that matches the userId and courseId
//     const enrollmentIndex = enrollments.findIndex(
//       (enrollment) => enrollment.user === userId && enrollment.course === courseId
//     );
//     // If the enrollment record exists, remove it
//     if (enrollmentIndex !== -1) {
//       enrollments.splice(enrollmentIndex, 1); // Remove the enrollment record
//     } else {
//       console.log(`Enrollment not found for user ${userId} in course ${courseId}`);
//     }
//   }