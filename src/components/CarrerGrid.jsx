import React from "react";
import CareerRoleCard from "./CareerRoleCard";
import { CareerRoles } from "./CareerRoles";

// Grid Component for all Career Roles
export default function CarrerGrid() {
  return (
    <section id="career-roles" className="space-y-8">
      <div className="space-y-3">
        <div>
          <h2 className="text-2xl font-bold gradient-text mb-2">
            المسارات المهنية في مجال التقنية
          </h2>
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-[#60F5FF] to-[#6C47FF]" />
        </div>
        <p className="text-sm text-[#C7CCF5] max-w-2xl">
          اختر المسار الوظيفي الذي يناسب اهتماماتك، وتعرّف على الاعتمادات المقترحة لكل مسار. ابدأ رحلتك الآن واطور مهاراتك.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CareerRoles.map((role) => (
          <CareerRoleCard key={role.id} role={role} />
        ))}
      </div>
    </section>
  );
}
