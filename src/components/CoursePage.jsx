import { useParams } from "react-router-dom";
import { CareerRoles } from "./CareerRoles";
import { useState } from "react";

export default function CoursePage() {
  const { roleId, courseIndex } = useParams();
  const role = CareerRoles.find((r) => r.id === roleId);

  if (!role) {
    return <p className="text-white p-10">Role not found</p>;
  }

  const course = role.courses[Number(courseIndex)];

  if (!course) {
    return <p className="text-white p-10">Course not found</p>;
  }

  return (
    <div className="min-h-screen bg-[#050615] p-10 text-white space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">{course.title}</h1>
        <p className="text-sm text-[#B7BCD9]">
          {course.provider} · {role.title}
        </p>
      </div>

      {/* Progress */}
      <CourseProgress sections={role.courseSections} />

      {/* Sections */}
      <div className="space-y-6">
        {role.courseSections.map((section, i) => (
          <CourseSection key={i} section={section} />
        ))}
      </div>
    </div>
  );
}
