import React from 'react'
import { useState } from "react";
import "./css/courseAssignments.css";
import Assignment from "./assignment";

export default function courseAssignments() {
    const [assignments, setAssignments] = useState([]);

    const handleNewAssignment = () => {
        setAssignments([...assignments, { id: Math.random() }]);
    };

    const handleAssignmentDelete = (id) => {
        setAssignments(assignments.filter((assignment) => assignment.id !== id));
    };

  return (
    <div className="courseAssignments">
        {assignments.map((assignment) => (
            <Assignment
                key={assignment.id}
                id={assignment.id}
                name={assignment.name}
                grade={assignment.grade}
                weight={assignment.weight}
                onDelete={handleAssignmentDelete}
            />
        ))}
        <button className="newAssignmentBtn" onClick={handleNewAssignment}>New Assignment +</button>
    </div>
  )
}
