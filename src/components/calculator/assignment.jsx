import React from 'react'
import { useState } from "react";
import "./css/assignment.css";

export default function assignment(props) {
    const [name, setName] = useState(props.name || "");
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
                Name:
                <div onClick={() => handleClick("name")}>
                    {editor === "name" ? (
                        <input
                            defaultValue={name}
                            onBlur={(e) => handleBlur("name", e.target.value)}
                            autoFocus
                        />
                    ) : (
                        <p>{name}</p>
                    )}
                </div>
            </div>
        </div>
        <div className="assignmentResults">
            <div>
                Grade %:
                <div onClick={() => handleClick("grade")} className="finalGrade">
                    {editor === "grade" ? (
                        <input
                            defaultValue={grade}
                            onBlur={(e) => handleBlur("grade", e.target.value)}
                            autoFocus
                        />
                    ) : (
                        <p>{grade}</p>
                    )}
                </div>
            </div>
            <div>
                Weight %:
                <div onClick={() => handleClick("weight")} className="weighting">
                    {editor === "weight" ? (
                        <input
                            defaultValue={weight}
                            onBlur={(e) => handleBlur("weight", e.target.value)}
                            autoFocus
                        />
                    ) : (
                        <p>{weight}</p>
                    )}
                </div>
            </div>
            <button className="deleteAssignmentBtn" onClick={() => props.onDelete(props.id)}>x</button>
        </div>
    </div>  
  )
}
