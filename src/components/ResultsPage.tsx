import type { TranslationSet } from '@/translations'

interface ResultsPageProps {
  t: TranslationSet
  sections: string[]
  onBackToForm: () => void
}

function ResultCard({
  num,
  title,
  content,
  delay,
  className,
  style,
}: {
  num: string
  title: string
  content: string
  delay: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className="apple-card rounded-2xl overflow-hidden reveal shadow-sm" style={{ animationDelay: delay }}>
      <div className="border-b border-apple-border/30 px-6 py-4 flex items-center gap-3">
        <span className={`section-header-icon text-white ${className ?? ''}`} style={style}>{num}</span>
        <h2 className="text-[17px] font-semibold text-apple-text">{title}</h2>
      </div>
      <div className="p-6 md:p-8 text-sm leading-relaxed text-apple-text/80" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default function ResultsPage({ t, sections, onBackToForm }: ResultsPageProps) {
  return (
    <div className="space-y-6 pb-6">
      <ResultCard
        num="1"
        title={t.section1}
        content={sections[0]}
        delay="0.1s"
        className="bg-apple-text"
      />
      <ResultCard
        num="2"
        title={t.section2}
        content={sections[1]}
        delay="0.2s"
        className="bg-apple-green"
      />
      <ResultCard
        num="3"
        title={t.section3}
        content={sections[2]}
        delay="0.3s"
        style={{ background: 'linear-gradient(135deg, #0071e3, #34c759)' }}
      />

      <button
        onClick={onBackToForm}
        className="w-full bg-white hover:bg-apple-bg text-apple-text font-medium text-[13px] py-3 px-6 rounded-xl transition-all duration-200 border border-apple-border/60 active:scale-[0.97] cursor-pointer"
      >
        {t.backBtn}
      </button>
    </div>
  )
}
