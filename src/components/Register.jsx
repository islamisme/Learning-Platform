import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const skillOptions = [
  'Science',
  'Mathematics',
  'Biology',
  'Technology',
  'Engineering',
  'Languages',
  'Arts & Design',
  'History & Culture',
]

const countries = [
  'Saudi Arabia',
  'United Arab Emirates',
  'Egypt',
  'Jordan',
  'Lebanon',
  'Kuwait',
  'Qatar',
  'Bahrain',
  'Oman',
  'Iraq',
  'Syria',
  'Yemen',
  'Palestine',
  'Morocco',
  'Algeria',
  'Tunisia',
  'Libya',
  'Sudan',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'France',
  'Germany',
  'Italy',
  'Spain',
  'Turkey',
  'India',
  'Pakistan',
  'Bangladesh',
  'Other',
]

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
    phone: '',
    role: '',
    country: '',
    skills: [],
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }))
  }

  const toggleSkill = (skill) => {
    setFormData((prev) => {
      const isSelected = prev.skills.includes(skill)
      return {
        ...prev,
        skills: isSelected ? prev.skills.filter((item) => item !== skill) : [...prev.skills, skill],
      }
    })
    setErrors((prev) => ({
      ...prev,
      skills: '',
    }))
  }

  const validateStepOne = () => {
    const requiredFields = ['username', 'email', 'password', 'gender', 'phone', 'role', 'country'  ]
    const newErrors = {}

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'هذا الحقل مطلوب'
      }
    })

    setErrors((prev) => ({ ...prev, ...newErrors }))
    return Object.keys(newErrors).length === 0
  }

  const handleNext = (event) => {
    event.preventDefault()
    if (validateStepOne()) {
      setStep(2)
    }
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleComplete = (event) => {
    event.preventDefault()
    if (!formData.skills.length) {
      setErrors((prev) => ({
        ...prev,
        skills: 'اختر مهارة واحدة على الأقل لتكملة التسجيل',
      }))
      
      return
    }

    navigate('/Home', { state: formData })
  }

  return (
    <div className="relative animated-background bg-gradient-to-br from-[#121869] via-[#1F1A55] to-[#6C47FF] flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(96,245,255,0.12),transparent_60%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,125,232,0.12),transparent_55%)]" aria-hidden />

      <div className="relative w-full max-w-4xl px-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_25px_55px_-20px_rgba(9,10,25,0.6)] backdrop-blur-xl">
          <div className="mb-10 flex flex-col gap-4 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#6C47FF]/40 bg-[#1F1A55]/70 px-6 py-2 text-xs uppercase tracking-[0.4em] text-[#60F5FF]">
              <span>{step === 1 ? 'Cadet Onboarding' : 'Skills Matrix'}</span>
            </div>
            <div>
              <h1 className="text-4xl font-semibold text-[#F5F7FF] mb-2">Create Your Learning Passport</h1>
              <p className="text-sm uppercase tracking-[0.35em] text-[#D5C9FF]">
                {step === 1 ? 'Fill in your credentials to unlock the next phase' : 'Pick what you love to learn next'}
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.35em] text-[#B7BCD9]">
              <span className={step === 1 ? 'text-[#60F5FF]' : 'text-[#B7BCD9]/70'}>Step 1 · Identity</span>
              <span className="text-[#B7BCD9]/50">/</span>
              <span className={step === 2 ? 'text-[#60F5FF]' : 'text-[#B7BCD9]/70'}>Step 2 · Skills</span>
            </div>
          </div>

          <form className="space-y-10">
            {step === 1 && (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-[0.35em] text-[#B7BCD9]">Username</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#60F5FF]/10 via-[#6C47FF]/10 to-transparent opacity-50" aria-hidden />
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      placeholder="astro.cadet"
                      className="relative w-full rounded-xl border border-white/10 bg-[#0F1223]/70 px-4 py-3 text-[#F5F7FF] placeholder:text-[#7E84AB] focus:border-[#60F5FF]/50 focus:outline-none focus:ring-2 focus:ring-[#60F5FF]/20 transition"
                    />
                  </div>
                  {errors.username && <p className="text-xs text-[#FF7DE8]">{errors.username}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-[0.35em] text-[#B7BCD9]">Email</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF7DE8]/10 via-[#6C47FF]/10 to-transparent opacity-50" aria-hidden />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="cadet@learningverse.io"
                      className="relative w-full rounded-xl border border-white/10 bg-[#0F1223]/70 px-4 py-3 text-[#F5F7FF] placeholder:text-[#7E84AB] focus:border-[#FF7DE8]/50 focus:outline-none focus:ring-2 focus:ring-[#FF7DE8]/20 transition"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-[#FF7DE8]">{errors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-[0.35em] text-[#B7BCD9]">Role</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF7DE8]/10 via-[#6C47FF]/10 to-transparent opacity-50" aria-hidden />
                    <select
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="relative w-full appearance-none rounded-xl border border-white/10 bg-[#0F1223]/70 px-4 py-3 text-[#F5F7FF] focus:border-[#FF7DE8]/50 focus:outline-none focus:ring-2 focus:ring-[#FF7DE8]/20 transition"
                    >
                      <option value="">Select your Role</option>
                      <option value="female">Instructor</option>
                      <option value="male">Student</option>
                    </select>
                  </div>
                  {errors.role && <p className="text-xs text-[#FF7DE8]">{errors.role}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-[0.35em] text-[#B7BCD9]">Password</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#60F5FF]/10 via-[#6C47FF]/10 to-transparent opacity-50" aria-hidden />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="••••••••"
                      className="relative w-full rounded-xl border border-white/10 bg-[#0F1223]/70 px-4 py-3 text-[#F5F7FF] placeholder:text-[#7E84AB] focus:border-[#60F5FF]/50 focus:outline-none focus:ring-2 focus:ring-[#60F5FF]/20 transition"
                    />
                  </div>
                  {errors.password && <p className="text-xs text-[#FF7DE8]">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-[0.35em] text-[#B7BCD9]">Gender</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF7DE8]/10 via-[#6C47FF]/10 to-transparent opacity-50" aria-hidden />
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="relative w-full appearance-none rounded-xl border border-white/10 bg-[#0F1223]/70 px-4 py-3 text-[#F5F7FF] focus:border-[#FF7DE8]/50 focus:outline-none focus:ring-2 focus:ring-[#FF7DE8]/20 transition"
                    >
                      <option value="">Select your identity</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="prefer-not">Prefer not to say</option>
                    </select>
                  </div>
                  {errors.gender && <p className="text-xs text-[#FF7DE8]">{errors.gender}</p>}
                </div>
               

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-xs uppercase tracking-[0.35em] text-[#B7BCD9]">Phone Number</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#60F5FF]/10 via-[#6C47FF]/10 to-transparent opacity-50" aria-hidden />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+966 55 123 4567"
                      className="relative w-full rounded-xl border border-white/10 bg-[#0F1223]/70 px-4 py-3 text-[#F5F7FF] placeholder:text-[#7E84AB] focus:border-[#60F5FF]/50 focus:outline-none focus:ring-2 focus:ring-[#60F5FF]/20 transition"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-[#FF7DE8]">{errors.phone}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-xs uppercase tracking-[0.35em] text-[#B7BCD9]">Country</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF7DE8]/10 via-[#6C47FF]/10 to-transparent opacity-50" aria-hidden />
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="relative w-full appearance-none rounded-xl border border-white/10 bg-[#0F1223]/70 px-4 py-3 text-[#F5F7FF] focus:border-[#FF7DE8]/50 focus:outline-none focus:ring-2 focus:ring-[#FF7DE8]/20 transition"
                    >
                      <option value="">Select your Country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.country && <p className="text-xs text-[#FF7DE8]">{errors.country}</p>}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-base text-[#D5C9FF]">
                    اختر المهارات أو التخصصات التي تهمّك، يمكن اختيار أكثر من بطاقة.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {skillOptions.map((skill) => {
                    const selected = formData.skills.includes(skill)
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`relative h-28 rounded-2xl border px-6 py-4 text-left transition ${
                          selected
                            ? 'border-[#60F5FF] bg-white/10 shadow-[0_15px_35px_-20px_rgba(96,245,255,0.9)]'
                            : 'border-white/10 bg-white/5 hover:border-[#60F5FF]/40 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-xs uppercase tracking-[0.35em] text-[#B7BCD9]">Skill Track</div>
                        <div className="mt-2 text-2xl font-semibold text-[#F5F7FF]">{skill}</div>
                        {selected && <div className="mt-2 text-xs text-[#60F5FF]">Selected</div>}
                      </button>
                    )
                  })}
                </div>
                {errors.skills && <p className="text-center text-sm text-[#FF7DE8]">{errors.skills}</p>}
              </div>
            )}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {step === 2 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#F5F7FF] hover:border-[#60F5FF]/40 hover:text-[#60F5FF] transition"
                >
                  Back
                </button>
              )}

              {step === 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full rounded-xl border border-[#6C47FF]/40 bg-gradient-to-r from-[#60F5FF] via-[#6C47FF] to-[#FF7DE8] px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#F5F7FF] shadow-[0_15px_35px_-18px_rgba(108,71,255,0.5)] transition hover:shadow-[0_20px_45px_-15px_rgba(108,71,255,0.6)] hover:scale-[1.02]"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleComplete}
                  className="w-full rounded-xl border border-[#6C47FF]/40 bg-gradient-to-r from-[#60F5FF] via-[#6C47FF] to-[#FF7DE8] px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#F5F7FF] shadow-[0_15px_35px_-18px_rgba(108,71,255,0.5)] transition hover:shadow-[0_20px_45px_-15px_rgba(108,71,255,0.6)] hover:scale-[1.02]"
                >
                  Complete Registration
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}