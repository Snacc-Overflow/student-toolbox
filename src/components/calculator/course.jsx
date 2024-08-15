import "./css/course.css";
import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import CourseHeader from "./courseHeader";
import Assignment from "./assignment";

/**
 * Course component represents a single course in the application. It displays the course's name,
 * a list of assignments, and calculated totals such as total achieved percentage, average achieved 
 * percentage, and the course grade.
 * 
 * The component manages its own state, including whether the assignments are visible, and tracks 
 * its assignments, total percent achieved, average percentage achieved, and course grade. 
 * Assignments can be added, deleted, and updated, with corresponding state updates for totals and averages.
 * 
 * State:
 * - `showAssignments` (Boolean): Determines whether the assignments for the course are visible.
 * - `totalAchieved` (Number): The total percentage achieved for the course.
 * - `averageAchieved` (Number): The average percentage achieved for the course.
 * - `courseGrade` (String): The grade of the course, default is "NA".
 * - `assignments` (Array): Array of assignment objects associated with the course.
 * @param {*} props 
 * @returns 
 */
export default function Course(props) {
  const [showAssignments, setShowAssignments] = useState(false);
  const [totalAchieved, setTotalAchieved] = useState(0);
  const [averageAcheived, setAverageAcheived] = useState(0);
  const [courseGrade, setCourseGrade] = useState("NA");
  const [assignments, setAssignments] = useState([]);

  const crypto = window.crypto || window.msCrypto;
  let array = new Uint32Array(1);
  let totalPercent;

  const handleNewAssignment = () => {
    setAssignments([...assignments, { id: crypto.getRandomValues(array) }]);
  };

  const handleAssignmentDelete = (id) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
  };

  const handleCourseClick = () => {
    setShowAssignments(!showAssignments);
  };

  /**
   *  Updates the data of a specific assignment and recalculates the total
   *  and average percentages. Is passed as a parameter to Assignment components.
   *
   * @param {*} id of the Assignment being updated
   * @param {*} updatedData Name, Grade% and Weight% inputs in Assignment components
   */
  const handleAssignmentUpdate = (id, updatedData) => {
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === id ? { ...assignment, ...updatedData } : assignment
    );
    setAssignments(updatedAssignments);

    calculateTotalPercent(updatedAssignments);
    console.log("Total percent " + totalPercent);
    calculateAveragePercent(updatedAssignments);
  };

  /**
   * Helper function called in 'handleAssignmentUpdate'.
   *
   * @param {*} updatedAssignments placeholder 'assignments' array since setter functions of the useState hook are async
   */
  const calculateTotalPercent = (updatedAssignments) => {
    totalPercent = 0;
    for (let assignment in updatedAssignments) {
      totalPercent +=
        parseFloat(updatedAssignments[assignment].weight || 0) *
        (parseFloat(updatedAssignments[assignment].grade || 0) / 100);
    }
    totalPercent.toFixed(1);
    setTotalAchieved(totalPercent);
  };

  /**
   * Helper function called in 'handleAssignmentUpdate'.
   *
   * @param {*} updatedAssignments placeholder 'assignments' array since setter functions of the useState hook are async
   */
  const calculateAveragePercent = (updatedAssignments) => {
    let averagePercent = 0;
    for (let assignment in updatedAssignments) {
      averagePercent += parseFloat(updatedAssignments[assignment].weight);
    }
    averagePercent = (totalPercent / averagePercent) * 100;
    averagePercent = parseFloat(averagePercent.toFixed(1));
    setAverageAcheived(averagePercent);
  };

  return (
    <div className="course">
      <CourseHeader
        courseName={props.courseName}
        onClick={handleCourseClick}
        onDelete={() => props.courseDelete(props.id)}
        totalAchieved={totalAchieved}
        averageAcheived={averageAcheived}
        courseGrade={courseGrade}
      ></CourseHeader>

      {showAssignments && (
        <div className="courseAssignments">
          {assignments.map((assignment) => (
            <Assignment
              key={assignment.id}
              id={assignment.id}
              name={assignment.name}
              grade={assignment.grade}
              weight={assignment.weight}
              onDelete={handleAssignmentDelete}
              onUpdate={handleAssignmentUpdate}
            />
          ))}
          <button className="newAssignmentBtn" onClick={handleNewAssignment}>
            New Assignment +
          </button>
        </div>
      )}
    </div>
  );
}

Course.propTypes = {
  courseName: PropTypes.string.isRequired,
  courseDelete: PropTypes.func.isRequired,
  id: PropTypes.isRequired,
};
