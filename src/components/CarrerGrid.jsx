import React from "react";
import CareerRoleCard from "./CareerRoleCard";
import { CareerRoles } from "./CareerRoles";

// Grid Component for all Career Roles
export default function CarrerGrid() {
  return (
    <section id="career-roles" className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B7BCD9]">
          المسارات المهنية في مجال التقنية
        </h2>
        <p className="text-xs text-[#C7CCF5]">
          اختر المسار الوظيفي الذي يناسب اهتماماتك، وتعرّف على الاعتمادات المقترحة لكل مسار.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CareerRoles.map((role) => (
          <CareerRoleCard key={role.id} role={role} />
        ))}
      </div>
    </section>
  );
}
