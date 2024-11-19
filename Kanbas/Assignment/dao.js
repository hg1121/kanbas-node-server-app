import Database from "../Database/index.js";

// http://localhost:3000/?#/Kanbas/Courses/:cid/Assignments
// http://localhost:3000/?#/Kanbas/Courses/:cid/Assignments/:aid
//

export function findAssignmentsOfCourse(courseId){
    const {assignments} = Database;
    const assignmentsOfCourse = assignments.filter((assignment) => 
        assignment.course === courseId
    );
    return assignmentsOfCourse;
}

export function createAssignment(assignment){
    Database.assignments = [...Database.assignments, assignment];
    return assignment;
}

export function deleteAssignment(assignmentId){
    const {assignments} = Database;
    Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
}

export function updateAssignment(assignmentId, assignmentUpdates){
    const {assignments} = Database;
    const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
}

