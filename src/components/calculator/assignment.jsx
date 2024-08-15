import React, {useState} from 'react';
import "./css/assignment.css";
import PropTypes from "prop-types";

export default function Assignment(props) {
    const [name, setName] = useState(props.assignmentName || "");
    const [grade, setGrade] = useState(props.grade || "");
    const [weight, setWeight] = useState(props.weight || "");
    const [editor, setEditor] = useState(null);

    const handleClick = (field) => {
        setEditor(field);
    };

    const handleBlur = (field, value) => {
        if (field === "name") {
            setName(value);
        } else if (value === "" ||
            (!isNaN(value) &&
            parseFloat(value) >= 0 &&
            parseFloat(value) <= 100)
        ) {
            if (value === "") value = 0; 
            if (field === "grade") {
              setGrade(value);
            } else if (field === "weight") {
              setWeight(value);
            }
        }
        setEditor(null);
    };

  return (
    <div className="assignment">
        <div>
            <div className="assignmentName">
                Name:{""}
                <button onClick={() => handleClick("name")}>
                    {editor === "name" ? (
                        <input
                            defaultValue={name}
                            onBlur={(e) => handleBlur("name", e.target.value)}
                            autoFocus
                        />
                    ) : (
                        <p>{name}</p>
                    )}
                </button>
            </div>
        </div>
        <div className="assignmentResults">
            <div>
                Grade %:{""}
                <button className="finalGrade" onClick={() => handleClick("grade")} id="finalGrade">
                    {editor === "grade" ? (
                        <input
                            defaultValue={grade}
                            onBlur={(e) => handleBlur("grade", e.target.value)}
                            autoFocus
                        />
                    ) : (
                        <p>{grade}</p>
                    )}
                </button>
            </div>
            <div>
                Weight %:{""}
                <button className="weighting" onClick={() => handleClick("weight")} id="weighting">
                    {editor === "weight" ? (
                        <input
                            defaultValue={weight}
                            onBlur={(e) => handleBlur("weight", e.target.value)}
                            autoFocus
                        />
                    ) : (
                        <p>{weight}</p>
                    )}
                </button>
            </div>
            <button className="deleteAssignmentBtn" onClick={() => props.onDelete(props.id)}>x</button>
        </div>
    </div>  
  )
}

Assignment.propTypes = {
    assignmentName: PropTypes.string.isRequired,
    id: PropTypes.isRequired,
    grade: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
  };
