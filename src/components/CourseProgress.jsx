import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { CareerRoles } from "./CareerRoles";

function CourseProgress() {
  const { courseId } = useParams();
  const [completedItems, setCompletedItems] = useState({});

  // Find course across all roles
  const course = CareerRoles
    .flatMap(role => role.courses.map(c => ({
      ...c,
      roleTitle: role.title,
      roleId: role.id,
      sections: role.courseSections
    })))
    .find(c => {
      const courseSlug = c.title.toLowerCase().replace(/\s+/g, "-");
      const fullId = `${c.roleId}-${c.title}`;
      return courseSlug === courseId || fullId === courseId;
    });

  // Calculate progress
  const { progress, totalItems, completedCount } = useMemo(() => {
    if (!course?.sections) return { progress: 0, totalItems: 0, completedCount: 0 };
    
    const total = course.sections.reduce((sum, section) => sum + section.items.length, 0);
    const completed = Object.values(completedItems).filter(Boolean).length;
    
    return {
      progress: total > 0 ? (completed / total) * 100 : 0,
      totalItems: total,
      completedCount: completed
    };
  }, [course, completedItems]);

  const handleToggleItem = (itemId) => {
    setCompletedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  if (!course) {
    return (
      <div className="text-center text-[#B7BCD9]">
        Course not found
      </div>
    );
  }

  return (
    <div className="space-y-8 text-white">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-[#F5F7FF]">
          {course.title}
        </h1>
        <p className="text-sm text-[#B7BCD9]">
          {course.provider} · {course.roleTitle}
        </p>
      </div>

      {/* Progress Section */}
      <div className="space-y-3 rounded-2xl border border-[#60F5FF]/20 bg-[#0F1223]/40 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D5C9FF]">
            Course Progress
          </h3>
          <span className="text-2xl font-bold text-[#60F5FF]">
            {Math.round(progress)}%
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-[#60F5FF] via-[#6C47FF] to-[#FF006E] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-[#B7BCD9]">
          <span>{completedCount} of {totalItems} completed</span>
          <span>{totalItems} total topics</span>
        </div>
      </div>

      {/* Chapters */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#D5C9FF]">
          Course Content
        </h2>
        
        {course.sections && course.sections.length > 0 ? (
          course.sections.map((section, idx) => {
            const sectionItems = section.items;
            const completedInSection = sectionItems.filter((_, i) => 
              completedItems[`${idx}-${i}`]
            ).length;
            const sectionProgress = (completedInSection / sectionItems.length) * 100;

            return (
              <div 
                key={idx} 
                className="space-y-4 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0F1223]/80 to-[#1a1d3a]/40 p-6 transition-all duration-300 hover:border-[#60F5FF]/30"
              >
                {/* Section Header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6C47FF]/30 text-[#60F5FF] font-semibold text-sm">
                      {idx + 1}
                    </div>
                    <h3 className="text-base font-semibold text-[#F5F7FF]">
                      {section.title}
                    </h3>
                  </div>
                  
                  {/* Section Progress */}
                  <div className="ml-11 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-white/10">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-[#60F5FF] to-[#6C47FF] transition-all duration-300"
                        style={{ width: `${sectionProgress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-[#B7BCD9] whitespace-nowrap">
                      {completedInSection}/{sectionItems.length}
                    </span>
                  </div>
                </div>

                {/* Section Items */}
                <ul className="ml-11 space-y-2">
                  {sectionItems.map((item, i) => {
                    const itemId = `${idx}-${i}`;
                    const isCompleted = completedItems[itemId];
                    
                    return (
                      <li
                        key={i}
                        className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-200 cursor-pointer group ${
                          isCompleted
                            ? "border-[#60F5FF]/40 bg-[#60F5FF]/10"
                            : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#60F5FF]/20"
                        }`}
                        onClick={() => handleToggleItem(itemId)}
                      >
                        <div className={`flex h-5 w-5 items-center justify-center rounded border transition-all ${
                          isCompleted
                            ? "border-[#60F5FF] bg-[#60F5FF]"
                            : "border-white/30 bg-white/5 group-hover:border-[#60F5FF]/50"
                        }`}>
                          {isCompleted && (
                            <svg className="h-3 w-3 text-[#0F1223]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-sm transition-all ${
                          isCompleted 
                            ? "text-[#60F5FF] line-through opacity-70" 
                            : "text-[#C7CCF5] group-hover:text-white"
                        }`}>
                          {item}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-[#B7BCD9]">No sections available for this course.</p>
        )}
      </div>
    </div>
  );
}

export default CourseProgress;
