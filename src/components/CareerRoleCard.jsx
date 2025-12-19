import React from "react";
import { Link } from "react-router-dom";

export default function CareerRoleCard({ role }) {
  return (
    <div className="group card-elevated h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-card transition-all duration-300 hover:border-[#60F5FF]/40">
      {role.image && (
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[#6C47FF]/20 to-transparent">
          <img
            src={role.image}
            alt={role.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1223] via-[#0F1223]/40 to-transparent opacity-70" />
          <div className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-[#60F5FF] to-[#6C47FF] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white">
            Featured
          </div>
        </div>
      )}
      
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-bold leading-snug text-white">
            {role.title}
          </h3>
          <p className="text-xs leading-relaxed text-[#C7CCF5] line-clamp-2">
            {role.description}
          </p>
        </div>
        
        <div className="space-y-2 border-t border-white/10 pt-3">
          <p className="text-[0.7rem] text-[#B7BCD9]">
            <span className="font-bold text-[#60F5FF]">Perfect for:</span>{" "}
            <span className="text-[#C7CCF5]">{role.likes}</span>
          </p>
        </div>
        
        {role.credentials?.length > 0 && (
          <div className="space-y-3">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#60F5FF]">
              Required Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {role.credentials.map((cred) => (
                <span
                  key={cred}
                  className="rounded-full border border-[#60F5FF]/30 bg-[#60F5FF]/10 px-3 py-1.5 text-[0.65rem] font-semibold text-[#60F5FF] transition-all duration-200 hover:border-[#60F5FF]/60 hover:bg-[#60F5FF]/20 hover:shadow-glow-cyan"
                >
                  {cred}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link
          to={`/Home/careers/${role.id}`}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#6C47FF] to-[#60F5FF] px-4 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white transition-all duration-200 hover:shadow-glow-cyan"
        >
          <span>Explore Path</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}
