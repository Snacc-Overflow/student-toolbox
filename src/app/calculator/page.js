"use client";
import CalculatorHeader from "@/components/calculator/header";
import "./calculator.css";
import CourseList from "@/components/calculator/courseList";
import { useState, useEffect } from "react";

export default function CalculatorPage() {
  const crypto = window.crypto || window.msCrypto;
  let array = new Uint32Array(1);

  const [isInputNameEmpty, setIsInputNameEmpty] = useState(true);
  const [courses, setCourses] = useState([]); // courses array stores course objects (not course components)
  const [courseName, setCourseName] = useState();
  const [gpa, setGpa] = useState("X");

  const handleNewCourseInput = (event) => {
    const inputValue = event.target.value;
    setIsInputNameEmpty(inputValue.trim() === "");
    setCourseName(inputValue);
  };

  const handleNewCourse = () => {
    setCourses([...courses, { id: crypto.getRandomValues(array), courseName }]);
  };

  const handleCourseDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleAverageUpdate = (id, newAverage) => {
    const updatedCourses = courses.map((course) =>
      course.id === id ? { ...course, averageAchieved: newAverage } : course
    );
    setCourses(updatedCourses);
  };

  useEffect(() => {
    let newGpa = 0;
    let count = 0;

    for (let course in courses) {
      if (!isNaN(courses[course].averageAchieved)) {
        newGpa += courses[course].averageAchieved;
        count++;
      }
    }

    if (count > 0) {
      setGpa((newGpa / count).toFixed(2));
      console.log(`gpa is ${newGpa}`);
    } else {
      setGpa("X");
    }
  }, [courses]);

  return (
    <main>
      <div className="gradeCalculator">
        <CalculatorHeader
          onNewCourseInput={handleNewCourseInput}
          onNewCourse={handleNewCourse}
          input={isInputNameEmpty}
        ></CalculatorHeader>

        <div className="overallGrade">Current GPA:{gpa}/9</div>

        <CourseList
          courses={courses}
          onCourseDelete={handleCourseDelete}
          onAverageUpdate={handleAverageUpdate}
        ></CourseList>
      </div>
    </main>
  );
}
