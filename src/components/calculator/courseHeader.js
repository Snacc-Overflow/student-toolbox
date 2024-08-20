import PropTypes from "prop-types";

export default function CourseHeader({
  courseName,
  onClick,
  onDelete,
  totalAchieved,
  averageAchieved,
  courseGrade,
}) {
  return (
    <div className="course-info" onClick={onClick} type="button" tabIndex={0}>
      <div>
        <div className="course-name">Course Name: {courseName}</div>
        <div className="letter-grade">{courseGrade}</div>
      </div>
      <div className="grade-summary">
        <div className="total-grade">Total %: {totalAchieved}%</div>
        <div className="average-grade">Average %: {averageAchieved}%</div>
        <button className="delete-course-btn" onClick={() => onDelete()}>
          x
        </button>
      </div>
    </div>
  );
}

CourseHeader.propTypes = {
  courseName: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  totalAchieved: PropTypes.number.isRequired,
  averageAchieved: PropTypes.number.isRequired,
  courseGrade: PropTypes.string.isRequired,
};
