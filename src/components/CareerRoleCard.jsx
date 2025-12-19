import React from "react";
import { Link } from "react-router-dom";

export default function CareerRoleCard({ role }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] shadow-[0_15px_35px_-18px_rgba(10,12,25,0.9)] transition-all duration-300 hover:border-[#60F5FF]/30 hover:shadow-[0_8px_32px_-8px_rgba(96,245,255,0.2)]">
      {role.image && (
        <div className="relative h-40 w-full overflow-hidden bg-black/30">
          <img
            src={role.image}
            alt={role.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1223] via-transparent to-transparent opacity-60" />
        </div>
      )}
      
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold leading-snug text-[#F5F7FF]">
            {role.title}
          </h3>
          <Link
            to={`/Home/careers/${role.id}`}
            className="group/link flex shrink-0 items-center gap-1 text-[0.6rem] uppercase tracking-[0.25em] text-[#60F5FF] transition-colors hover:text-[#F5F7FF]"
          >
            <span>View</span>
            <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
          </Link>
        </div>
        
        <p className="text-xs leading-relaxed text-[#C7CCF5] line-clamp-3">
          {role.description}
        </p>
        
        <div className="space-y-1">
          <p className="text-[0.7rem] text-[#B7BCD9]">
            <span className="font-semibold text-[#60F5FF]">If you like:</span>{" "}
            {role.likes}
          </p>
        </div>
        
        {role.credentials?.length > 0 && (
          <div className="mt-auto space-y-2 pt-2">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#B7BCD9]">
              Credentials
            </p>
            <div className="flex flex-wrap gap-1.5">
              {role.credentials.map((cred) => (
                <span
                  key={cred}
                  className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[0.65rem] text-[#F5F7FF] transition-colors hover:border-[#60F5FF]/30 hover:bg-[#60F5FF]/10"
                >
                  {cred}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
