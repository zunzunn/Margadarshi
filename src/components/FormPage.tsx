import type { TranslationSet } from '@/translations'

interface FormPageProps {
  t: TranslationSet
  onSubmit: () => void
  onLogout: () => void
  isProcessing: boolean
}

export default function FormPage({ t, onSubmit, onLogout, isProcessing }: FormPageProps) {
  return (
    <div>
      <header className="text-center mb-12 md:mb-14 reveal">
        <h1 className="text-[2.5rem] md:text-[3.25rem] font-semibold tracking-tight text-apple-text leading-[1.1] mb-3">
          Margadarshi
        </h1>
        <p className="text-apple-secondary text-base md:text-lg font-normal max-w-md mx-auto leading-relaxed">
          {t.headerSub}
          <br />
          <span className="text-sm md:text-base text-apple-secondary/70">
            {t.headerSubKn}
          </span>
        </p>
      </header>

      <div className="apple-card rounded-2xl p-6 md:p-8 mb-6 reveal shadow-sm">
        <form id="profileForm" className="space-y-5 md:space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>

          {/* ── Academic Background ── */}
          <div className="space-y-1.5">
            <label htmlFor="classGrade" className="block text-sm font-medium text-apple-text">
              <span>{t.labelClass}</span>
              {t.labelClassKn && <span className="text-apple-secondary font-normal ml-1">{t.labelClassKn}</span>}
            </label>
            <select
              id="classGrade"
              required
              defaultValue=""
              className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors"
            >
              {t.classOptions.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={!opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="space-y-1.5">
              <label htmlFor="board" className="block text-sm font-medium text-apple-text">
                <span>{t.labelBoard}</span>
                {t.labelBoardKn && <span className="text-apple-secondary font-normal ml-1">{t.labelBoardKn}</span>}
              </label>
              <select
                id="board"
                required
                defaultValue=""
                className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors"
              >
                {t.boardOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={!opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-apple-secondary/70">{t.hintBoard}</p>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="medium" className="block text-sm font-medium text-apple-text">
                <span>{t.labelMedium}</span>
                {t.labelMediumKn && <span className="text-apple-secondary font-normal ml-1">{t.labelMediumKn}</span>}
              </label>
              <select
                id="medium"
                required
                defaultValue=""
                className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors"
              >
                {t.mediumOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={!opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-apple-secondary/70">{t.hintMedium}</p>
            </div>
          </div>

          {/* ── Academic Performance ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="space-y-1.5">
              <label htmlFor="marks" className="block text-sm font-medium text-apple-text">
                <span>{t.labelMarks}</span>
                {t.labelMarksKn && <span className="text-apple-secondary font-normal ml-1">{t.labelMarksKn}</span>}
              </label>
              <input
                type="text"
                id="marks"
                required
                placeholder={t.marksPlaceholder}
                className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors placeholder:text-apple-secondary/40"
              />
              <p className="text-[11px] text-apple-secondary/70">{t.hintMarks}</p>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="strongSubjects" className="block text-sm font-medium text-apple-text">
                <span>{t.labelSubjects}</span>
                <span className="text-apple-secondary font-normal ml-1">{t.labelSubjectsOptional}</span>
              </label>
              <input
                type="text"
                id="strongSubjects"
                placeholder={t.subjectsPlaceholder}
                className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors placeholder:text-apple-secondary/40"
              />
              <p className="text-[11px] text-apple-secondary/70">{t.hintSubjects}</p>
            </div>
          </div>

          {/* ── Preferences ── */}
          <div className="space-y-1.5">
            <label htmlFor="stream" className="block text-sm font-medium text-apple-text">
              <span>{t.labelStream}</span>
              {t.labelStreamKn && <span className="text-apple-secondary font-normal ml-1">{t.labelStreamKn}</span>}
            </label>
            <select
              id="stream"
              required
              defaultValue=""
              className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors"
            >
              {t.streamOptions.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={!opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-apple-secondary/70">{t.hintStream}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="space-y-1.5">
              <label htmlFor="collegeType" className="block text-sm font-medium text-apple-text">
                <span>{t.labelCollegeType}</span>
                {t.labelCollegeTypeKn && <span className="text-apple-secondary font-normal ml-1">{t.labelCollegeTypeKn}</span>}
              </label>
              <select
                id="collegeType"
                required
                defaultValue=""
                className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors"
              >
                {t.collegeTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={!opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-apple-secondary/70">{t.hintCollegeType}</p>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="stay" className="block text-sm font-medium text-apple-text">
                <span>{t.labelStay}</span>
                {t.labelStayKn && <span className="text-apple-secondary font-normal ml-1">{t.labelStayKn}</span>}
              </label>
              <select
                id="stay"
                required
                defaultValue=""
                className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors"
              >
                {t.stayOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={!opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-apple-secondary/70">{t.hintStay}</p>
            </div>
          </div>

          {/* ── Financial Info ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="space-y-1.5">
              <label htmlFor="income" className="block text-sm font-medium text-apple-text">
                <span>{t.labelIncome}</span>
                {t.labelIncomeKn && <span className="text-apple-secondary font-normal ml-1">{t.labelIncomeKn}</span>}
              </label>
              <select
                id="income"
                required
                defaultValue=""
                className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors"
              >
                {t.incomeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={!opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-apple-secondary/70">{t.hintIncome}</p>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="budget" className="block text-sm font-medium text-apple-text">
                <span>{t.labelBudget}</span>
                {t.labelBudgetKn && <span className="text-apple-secondary font-normal ml-1">{t.labelBudgetKn}</span>}
              </label>
              <select
                id="budget"
                required
                defaultValue=""
                className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors"
              >
                {t.budgetOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={!opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-apple-secondary/70">{t.hintBudget}</p>
            </div>
          </div>

          {/* ── Goals ── */}
          <div className="space-y-1.5">
            <label htmlFor="prefCourse" className="block text-sm font-medium text-apple-text">
              <span>{t.labelPrefCourse}</span>
              {t.labelPrefCourseKn && <span className="text-apple-secondary font-normal ml-1">{t.labelPrefCourseKn}</span>}
            </label>
            <input
              type="text"
              id="prefCourse"
              placeholder={t.hintPrefCourse}
              className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors placeholder:text-apple-secondary/40"
            />
            <p className="text-[11px] text-apple-secondary/70">{t.hintPrefCourse}</p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="coreInterest" className="block text-sm font-medium text-apple-text">
              <span>{t.labelInterest}</span>
              <br />
              {t.labelInterestKn && <span className="text-apple-secondary font-normal text-xs">{t.labelInterestKn}</span>}
            </label>
            <p className="text-xs text-apple-secondary/80 mb-1 leading-relaxed">{t.hintInterest}</p>
            <textarea
              id="coreInterest"
              rows={4}
              required
              placeholder={t.interestPlaceholder}
              className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors resize-none placeholder:text-apple-secondary/40"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="btn-apple w-full bg-apple-text hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-[15px] py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.97] cursor-pointer"
          >
            <span>{isProcessing ? t.processing : t.btnSubmit}</span>
            {!isProcessing && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </button>
        </form>
      </div>

      <button
        onClick={onLogout}
        className="w-full bg-white hover:bg-apple-bg text-apple-secondary hover:text-red-500 font-medium text-[13px] py-3 px-6 rounded-xl transition-all duration-200 border border-apple-border/60 active:scale-[0.97] cursor-pointer"
      >
        {t.logoutBtn}
      </button>
    </div>
  )
}
