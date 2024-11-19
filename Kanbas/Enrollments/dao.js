import Database from "../Database/index.js";

export function enrollUserInCourse(userId, courseId) {
//   console.log("userId", "courseId", userId, courseId)
  const { enrollments } = Database;
  enrollments.push({ _id: String(enrollments.length + 1), user: userId, course: courseId });
//   console.log("enrollments", enrollments[enrollments.length - 1]);
}

export function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = Database;
    // Find the index of the enrollment record that matches the userId and courseId
    const enrollmentIndex = enrollments.findIndex(
      (enrollment) => enrollment.user === userId && enrollment.course === courseId
    );
    // If the enrollment record exists, remove it
    if (enrollmentIndex !== -1) {
      enrollments.splice(enrollmentIndex, 1); // Remove the enrollment record
    } else {
      console.log(`Enrollment not found for user ${userId} in course ${courseId}`);
    }
  }