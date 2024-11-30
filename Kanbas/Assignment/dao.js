import Database from "../Database/index.js";
import model from "./model.js";

// http://localhost:3000/?#/Kanbas/Courses/:cid/Assignments
// http://localhost:3000/?#/Kanbas/Courses/:cid/Assignments/:aid

// Fetch assignments for a specific course
export async function findAssignmentsOfCourse(courseId) {
    return model.find({ course: courseId });
  }
  
  // Create a new assignment
  export async function createAssignment(assignment) {
    delete assignment._id;
    return model.create(assignment);
  }
  
  // Delete an assignment by ID
  export async function deleteAssignment(assignmentId) {
    return model.deleteOne({_id: assignmentId});
  }
  
  // Update an assignment by ID
  export async function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne({ _id: assignmentId }, assignmentUpdates)
  }

// export function findAssignmentsOfCourse(courseId){
//     const {assignments} = Database;
//     const assignmentsOfCourse = assignments.filter((assignment) => 
//         assignment.course === courseId
//     );
//     return assignmentsOfCourse;
// }

// export function createAssignment(assignment){
//     Database.assignments = [...Database.assignments, assignment];
//     return assignment;
// }

// export function deleteAssignment(assignmentId){
//     const {assignments} = Database;
//     Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
// }

// export function updateAssignment(assignmentId, assignmentUpdates){
//     const {assignments} = Database;
//     const assignment = assignments.find((assignment) => assignment._id === assignmentId);
//     Object.assign(assignment, assignmentUpdates);
//     return assignment;
// }

