import React from 'react'

export default function Courses() {
  const courses = [
    { title: 'Quantum UX Foundations', progress: 72, instructor: 'Nova Ashton' },
    { title: 'AI-Driven Content Strategy', progress: 54, instructor: 'Kepler Voss' },
    { title: 'Stellar Presentation Skills', progress: 36, instructor: 'Lyra Quinn' },
  ]
  return (
    <>
    <div className='grid grid-cols-3 gap-4 text-white'>
      {courses.map((courses)=>
        <>
        <p className='text-sm font-medium text-[#F5F7FF]'>{courses.title}</p>
        <p className='text-xs uppercase tracking-[0.35em] text-[#B7BCD9]'>{courses.instructor}</p>
        <span className='text-xs uppercase tracking-[0.3em] text-[#60F5FF]'>
                      {courses.progress}%
                    </span>
        </>
      )}      
    </div>
    </>
  )
}

