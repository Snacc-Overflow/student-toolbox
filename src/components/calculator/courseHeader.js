import PropTypes from "prop-types";

export default function CourseHeader({
  courseName,
  onClick,
  onDelete,
  totalAchieved,
  averageAcheived,
  courseGrade,
}) {
  return (
    <button className="course-info" onClick={onClick}>
      <div>
        <div className="course-name">{courseName}</div>
        <div className="letter-grade">{courseGrade}</div>
      </div>

      <div className="grade-summary">
        <button className="delete-course-btn" onClick={() => onDelete()}>
          x
        </button>
      </div>

    </button>
  );
}

CourseHeader.propTypes = {
  courseName: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  totalAchieved: PropTypes.number.isRequired,
  averageAcheived: PropTypes.number.isRequired,
  courseGrade: PropTypes.string.isRequired,
};
