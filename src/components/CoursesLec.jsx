import React, { useEffect, useState } from "react";
import { CareerRoles } from "./CareerRoles";

function CoursesLec({ courseId }) {
  const [lectures, setLectures] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) {
      setLectures([]);
      setCourseTitle("");
      setLoading(false);
      return;
    }

    let foundLectures = [];
    let title = "";

    // Search through all roles and their courses
    for (const role of CareerRoles) {
      const course = role.courses?.find(c => c.id === courseId);
      if (course) {
        title = course.title;
        // Extract lectures from courseSections
        if (Array.isArray(role.courseSections)) {
          role.courseSections.forEach(section => {
            if (section.lectures && Array.isArray(section.lectures)) {
              foundLectures = foundLectures.concat(
                section.lectures.map((lecture, idx) => ({
                  id: `${section.title}-${idx}`,
                  section: section.title,
                  content: lecture,
                }))
              );
            }
          });
        }
        break; // assuming course IDs are unique across roles
      }
    }

    setCourseTitle(title);
    setLectures(foundLectures);
    setLoading(false);
  }, [courseId]);

  if (loading) {
    return <div className="text-white">Loading lectures...</div>;
  }

  if (!courseId) {
    return <div className="text-white">No course selected.</div>;
  }

  if (lectures.length === 0) {
    return (
      <div className="text-white">
        No lectures available for this course.
      </div>
    );
  }

  return (
    <div className="text-white space-y-6">
      <h2 className="text-2xl font-bold text-[#F5F7FF]">{courseTitle}</h2>
      <div className="space-y-4">
        {lectures.map((lec) => (
          <div
            key={lec.id}
            className="border-l-4 border-[#60F5FF] pl-4 py-2 bg-white/5 rounded-r-lg"
          >
            <p className="text-[#C7CCF5]">{lec.content}</p>
            <p className="text-xs text-[#B7BCD9] mt-1">Section: {lec.section}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesLec;