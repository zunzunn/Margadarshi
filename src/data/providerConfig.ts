export type Provider = 'groq' | 'gemini';

interface ProviderConfigItem {
  storageKey: string;
  endpoint: string | ((apiKey: string) => string);
  desc: string;
  placeholder: string;
  makePayload: (systemMessage: string, userMessage: string) => Record<string, unknown>;
  getHeaders: (apiKey: string) => Record<string, string>;
  extractContent: (data: Record<string, unknown>) => string;
}

export const providerConfig: Record<Provider, ProviderConfigItem> = {
  groq: {
    storageKey: 'groq_api_key',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    desc: "Enter your Groq API Key. It's stored locally in your browser.",
    placeholder: 'Paste Groq API Key...',
    makePayload: (systemMessage, userMessage) => ({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.6,
      max_tokens: 2500,
    }),
    getHeaders: (apiKey) => ({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + apiKey,
    }),
    extractContent: (data) => {
      const choices = data.choices as Array<{ message: { content: string } }> | undefined;
      if (!choices || !choices[0] || !choices[0].message)
        throw new Error('Received malformed or empty response from the AI.');
      return choices[0].message.content;
    },
  },
  gemini: {
    storageKey: 'gemini_api_key',
    endpoint: (apiKey) =>
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    desc: "Enter your Google Gemini API Key. It's stored locally in your browser.",
    placeholder: 'Paste Gemini API Key...',
    makePayload: (systemMessage, userMessage) => ({
      contents: [
        {
          role: 'user',
          parts: [{ text: systemMessage + '\n\n' + userMessage }],
        },
      ],
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 2500,
      },
    }),
    getHeaders: () => ({
      'Content-Type': 'application/json',
    }),
    extractContent: (data) => {
      const candidates = data.candidates as
        | Array<{ content: { parts: Array<{ text: string }> } }>
        | undefined;
      if (!candidates || !candidates[0]?.content?.parts)
        throw new Error('Received malformed or empty response from the AI.');
      return candidates[0].content.parts[0].text;
    },
  },
};
