import { providerConfig } from '@/data/providerConfig'
import { translations } from '@/translations'
import type { Lang } from '@/translations'
import { bangaloreColleges, collegeWebsites } from '@/data/bangaloreColleges'

export function parseMarkdown(md: string, noContentText: string): string {
  if (!md) return `<p class='italic text-apple-secondary/60'>${noContentText}</p>`;
  let text = md.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-apple-text">$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  const lines = text.split('\n');
  let html = '';
  let inList = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') {
      if (inList) { html += '</ul>\n'; inList = false; }
      continue;
    }
    if (line.startsWith('### ')) {
      if (inList) { html += '</ul>\n'; inList = false; }
      html += '<h3 class="text-[15px] font-semibold mt-5 mb-2 text-apple-text">' + line.substring(4) + '</h3>\n';
      continue;
    }
    if (line.startsWith('## ')) {
      if (inList) { html += '</ul>\n'; inList = false; }
      html += '<h3 class="text-[17px] font-semibold mt-6 mb-3 text-apple-text">' + line.substring(3) + '</h3>\n';
      continue;
    }
    if (line.startsWith('# ')) {
      if (inList) { html += '</ul>\n'; inList = false; }
      html += '<h2 class="text-xl font-semibold mt-8 mb-4 text-apple-text">' + line.substring(2) + '</h2>\n';
      continue;
    }
    if (line.startsWith('* ') || line.startsWith('- ')) {
      if (!inList) {
        html += '<ul class="list-disc pl-5 mb-4 space-y-1.5 text-apple-text/80 marker:text-apple-blue">\n';
        inList = true;
      }
      html += '<li class="leading-relaxed">' + line.substring(2) + '</li>\n';
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      if (inList) { html += '</ul>\n'; inList = false; }
      const rest = line.substring(line.indexOf('.') + 1).trim();
      html += '<div class="flex items-start mb-2.5"><span class="font-semibold text-apple-blue mr-2.5 shrink-0">' + line.match(/^\d+/)![0] + '.</span><p class="text-apple-text/80 leading-relaxed flex-1">' + rest + '</p></div>\n';
      continue;
    }
    if (inList) { html += '</ul>\n'; inList = false; }
    html += '<p class="mb-3.5 text-apple-text/80 leading-relaxed">' + line + '</p>\n';
  }
  if (inList) { html += '</ul>\n'; }
  return html;
}

export async function getAIRecommendations(
  apiKey: string,
  classGrade: string,
  board: string,
  medium: string,
  marks: string,
  strongSubjects: string,
  stream: string,
  collegeType: string,
  stay: string,
  income: string,
  budget: string,
  prefCourse: string,
  coreInterest: string,
  lang: string,
  provider: string
): Promise<string[]> {
  const t = translations[lang as Lang]
  const conf = providerConfig[provider as keyof typeof providerConfig]

  const incomeLabel = t.incomeOptions.find(o => o.value === income)?.label || income
  const budgetLabel = t.budgetOptions.find(o => o.value === budget)?.label || budget

  const collegeDbCompact = bangaloreColleges.map(c => {
    const url = collegeWebsites[c.name] || ''
    const courses = c.courses.map(co => `  - ${co.name}: ₹${Math.round(co.feesPerYear / 1000)}K/yr (${co.stream})`).join('\n')
    return `${c.name} [${c.type}]${c.hostelAvailable ? ' H' : ''}${url ? ` ${url}` : ''}\n${courses}`
  }).join('\n\n')

  const systemMessage = `You are a career counselor for rural students seeking Bangalore colleges. Know KCET, COMEDK, NEET, Karnataka scholarships, quotas, and the local college landscape.
${t.aiLang}
Use the college database below to recommend specific colleges with course names and annual fees.`;

  const userMessage = `STUDENT PROFILE:
- Class: ${classGrade}
- Board: ${board} | Medium: ${medium}
- Marks: ${marks} | Strong subjects: ${strongSubjects}
- Preferred stream: ${stream} | College type: ${collegeType} | Stay: ${stay}
- Family income: ${incomeLabel} | Budget: ${budgetLabel}
- Desired course: ${prefCourse}
- Core interest: "${coreInterest}"

BANGALORE COLLEGES DATABASE (fees are approximate annual):
${collegeDbCompact}

Respond with exactly 3 sections separated by "|||". No greetings or intros. No section titles in output.

1 (College Matches): Recommend 3-5 specific Bangalore colleges from the database matching this student's profile. Mention course name, annual fee, why it fits, and the college website URL from the database. After each college, advise the student to research more at their website for the latest fee and admission details. If fees exceed budget, note relevant scholarships (Vidyasiri, SSP, KCET fee concession).
|||
2 (Financial Roadmap): Break down total annual cost (tuition + hostel/PG/living). List applicable Karnataka government scholarships by income bracket. Simple steps to apply.
|||
3 (Admission Roadmap): Step-by-step timeline for Bangalore admission — key exams (KCET, COMEDK, NEET), typical deadlines (Mar-Jun), documents needed, KEA counseling process. Tailor to their class and stream.`;

  const payload = conf.makePayload(systemMessage, userMessage);
  const url = typeof conf.endpoint === 'function' ? conf.endpoint(apiKey) : conf.endpoint;

  const response = await fetch(url, {
    method: 'POST',
    headers: conf.getHeaders(apiKey),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(`API Error ${response.status}: ${(errData as Record<string, { message?: string }>).error?.message || response.statusText}`);
  }

  const data: Record<string, unknown> = await response.json();
  const aiResponseText = conf.extractContent(data);
  const sections = aiResponseText.split('|||');

  if (sections.length < 3) {
    console.warn("AI didn't output exact delimiters. Using fallback rendering.");
    return [aiResponseText, '', ''];
  }

  return sections;
}
