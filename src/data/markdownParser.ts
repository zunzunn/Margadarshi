import { providerConfig } from '@/data/providerConfig'
import { translations } from '@/translations'
import type { Lang } from '@/translations'

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
  marks: string,
  strongSubjects: string,
  coreInterest: string,
  lang: string,
  provider: string
): Promise<string[]> {
  const t = translations[lang as Lang]
  const conf = providerConfig[provider as keyof typeof providerConfig]

  const systemMessage = `You are an empathetic, deeply knowledgeable career counselor stationed in rural Karnataka, India.
You understand the ground realities of rural school and college students, budget constraints, internet access issues, and state-specific educational frameworks.
${t.aiLang}`;

  const userMessage = `Student Profile:
- Class/Grade: ${classGrade}
- Academic Performance / Marks: ${marks}
- Strongest Subjects: ${strongSubjects}
- Actual Core Interest (in their own words): "${coreInterest}"
Analyze this profile and provide a highly localized, actionable response formatted strictly into three distinct sections separated exactly by "|||". 
Do NOT include any introduction, conversational filler, or greeting. Do NOT write the section titles (e.g. "Section 1: Academic Alignment") inside your content, as the UI already provides them. Just provide the direct markdown content for each.
First part (Academic Alignment):
Analyze their current class and marks to suggest realistic, immediate next steps in Karnataka's ecosystem (e.g., PUC streams, local GTTC, ITIs, polytechnics, degrees). Highlight relevant Karnataka state welfare, reservations, or scholarships (Vidyasiri, SSP) if applicable.
|||
Second part (Passion Bridge & Roadmap):
If the student's marks are low but their interest demands high academics, or if they have an unconventional interest, provide an encouraging, realistic "alternative bridge". Give a step-by-step roadmap showing how to break into their field using practical skills, open-source learning, vocational certificates, or alternative entries, bypassing rigid gatekeeping. Be highly practical.
|||
Third part (Competitive Horizons):
Provide a dedicated list of competitive exams, talent hunt exams, and Olympiads tailored strictly to their current grade and interests to build early exposure. Include relevant state/national opportunities like NMMS, NTSE, SOF, Homi Bhabha, KCET, DCET, or regional skill competitions.`;

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
