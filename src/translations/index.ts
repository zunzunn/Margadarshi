export type Lang = 'en' | 'hi' | 'kn';

export interface TranslationSet {
  settingsLabel: string;
  settingsLabelKn: string;
  saveKey: string;
  headerSub: string;
  headerSubKn: string;
  labelClass: string;
  labelClassKn: string;
  labelMarks: string;
  labelMarksKn: string;
  labelSubjects: string;
  labelSubjectsOptional: string;
  labelInterest: string;
  labelInterestKn: string;
  hintMarks: string;
  hintSubjects: string;
  hintInterest: string;
  marksPlaceholder: string;
  subjectsPlaceholder: string;
  interestPlaceholder: string;
  btnSubmit: string;
  loadingTitle: string;
  loadingDesc: string;
  errorTitle: string;
  errorMsg: string;
  noKeyError: string;
  processing: string;
  noContent: string;
  section1: string;
  section2: string;
  section3: string;
  keySaved: string;
  keyRemoved: string;
  backBtn: string;
  logoutBtn: string;
  classOptions: { value: string; label: string }[];
  aiLang: string;
  loadingSteps: string[];
}

export const translations: Record<Lang, TranslationSet> = {
  en: {
    settingsLabel: 'Developer Settings',
    settingsLabelKn: '(ಸಂರಚನೆ)',
    saveKey: 'Save Key',
    headerSub: "Empowering Rural Karnataka's Future",
    headerSubKn: '(ಕರ್ನಾಟಕ ವಿದ್ಯಾರ್ಥಿಗಳ ಮಾರ್ಗದರ್ಶಿ)',
    labelClass: 'Current Class / Grade',
    labelClassKn: '(ಪ್ರಸ್ತುತ ತರಗತಿ)',
    labelMarks: 'Academic Performance',
    labelMarksKn: '(ಅಂಕಗಳು)',
    labelSubjects: 'Strongest Subjects',
    labelSubjectsOptional: '(Optional)',
    labelInterest: 'What are you genuinely passionate about?',
    labelInterestKn: '(ನಿಮ್ಮ ಆಸಕ್ತಿ ಏನು?)',
    hintMarks: 'Overall % from your last main exams.',
    hintSubjects: 'What are you naturally good at?',
    hintInterest: "Write freely in your own words. Don't worry about sounding professional.",
    marksPlaceholder: 'e.g., 65%, B+, 8.5 CGPA',
    subjectsPlaceholder: 'e.g., Kannada, Social Science',
    interestPlaceholder: 'Tell us your story and interests...',
    btnSubmit: 'Discover My Path',
    loadingTitle: 'Analyzing your unique profile...',
    loadingDesc:
      'Mapping the best educational and vocational opportunities in Karnataka just for you.',
    errorTitle: 'Something went wrong',
    errorMsg: 'An error occurred.',
    noKeyError:
      'API Key is missing. Please enter your API Key in the Developer Settings at the top.',
    processing: 'Processing...',
    noContent: 'No content available.',
    section1: 'Academic Alignment',
    section2: 'Passion Bridge & Roadmap',
    section3: 'Competitive Horizons',
    keySaved: 'API Key saved locally!',
    keyRemoved: 'API Key removed.',
    backBtn: '← Back to Form',
    logoutBtn: '← Back to Login',
    classOptions: [
      { value: '', label: 'Select your current education level' },
      { value: 'Class 8', label: 'Class 8' },
      { value: 'Class 9', label: 'Class 9' },
      { value: 'Class 10 (SSLC)', label: 'Class 10 / SSLC' },
      { value: 'Class 11 (1st PUC)', label: 'Class 11 / 1st PUC' },
      { value: 'Class 12 (2nd PUC)', label: 'Class 12 / 2nd PUC' },
      { value: 'Diploma/ITI', label: 'Diploma / ITI' },
      { value: 'Degree 1st Year', label: 'Degree 1st Year' },
    ],
    aiLang: 'You MUST respond in English. Keep all section content in English only.',
    loadingSteps: [
      'Analyzing academic strengths...',
      'Matching career pathways...',
      'Finding scholarship opportunities...',
      'Building personalized roadmap...',
      'Generating AI insights...',
    ],
  },
  hi: {
    settingsLabel: 'डेवलपर सेटिंग्स',
    settingsLabelKn: '',
    saveKey: 'कुंजी सहेजें',
    headerSub: 'ग्रामीण कर्नाटक के भविष्य को सशक्त बनाना',
    headerSubKn: '',
    labelClass: 'वर्तमान कक्षा / ग्रेड',
    labelClassKn: '',
    labelMarks: 'शैक्षणिक प्रदर्शन',
    labelMarksKn: '',
    labelSubjects: 'सबसे मजबूत विषय',
    labelSubjectsOptional: '(वैकल्पिक)',
    labelInterest: 'आप वास्तव में किस चीज़ के बारे में भावुक हैं?',
    labelInterestKn: '',
    hintMarks: 'आपकी पिछली मुख्य परीक्षाओं का समग्र प्रतिशत।',
    hintSubjects: 'आप स्वाभाविक रूप से किसमें अच्छे हैं?',
    hintInterest: 'अपने शब्दों में स्वतंत्र रूप से लिखें। पेशेवर लगने की चिंता न करें।',
    marksPlaceholder: 'जैसे, 65%, B+, 8.5 CGPA',
    subjectsPlaceholder: 'जैसे, हिंदी, विज्ञान',
    interestPlaceholder: 'अपनी कहानी और रुचियाँ बताएं...',
    btnSubmit: 'मेरा रास्ता खोजें',
    loadingTitle: 'आपकी अनूठी प्रोफ़ाइल का विश्लेषण...',
    loadingDesc:
      'आपके लिए कर्नाटक में सर्वोत्तम शैक्षिक और व्यावसायिक अवसरों का मानचित्रण।',
    errorTitle: 'कुछ गलत हो गया',
    errorMsg: 'एक त्रुटि हुई।',
    noKeyError:
      'API कुंजी गुम है। कृपया ऊपर डेवलपर सेटिंग्स में अपनी API कुंजी दर्ज करें।',
    processing: 'प्रसंस्करण...',
    noContent: 'कोई सामग्री उपलब्ध नहीं है।',
    section1: 'शैक्षणिक संरेखण',
    section2: 'रुचि पुल और रोडमैप',
    section3: 'प्रतिस्पर्धी क्षितिज',
    keySaved: 'API कुंजी स्थानीय रूप से सहेजी गई!',
    keyRemoved: 'API कुंजी हटा दी गई।',
    backBtn: '← फॉर्म पर वापस जाएं',
    logoutBtn: '← लॉगिन पर वापस जाएं',
    classOptions: [
      { value: '', label: 'अपनी वर्तमान शिक्षा स्तर चुनें' },
      { value: 'Class 8', label: 'कक्षा 8' },
      { value: 'Class 9', label: 'कक्षा 9' },
      { value: 'Class 10 (SSLC)', label: 'कक्षा 10 / SSLC' },
      { value: 'Class 11 (1st PUC)', label: 'कक्षा 11 / 1st PUC' },
      { value: 'Class 12 (2nd PUC)', label: 'कक्षा 12 / 2nd PUC' },
      { value: 'Diploma/ITI', label: 'डिप्लोमा / ITI' },
      { value: 'Degree 1st Year', label: 'डिग्री प्रथम वर्ष' },
    ],
    aiLang: 'You MUST respond in Hindi (हिंदी). Keep section content in Hindi only.',
    loadingSteps: [
      'शैक्षणिक ताकत का विश्लेषण...',
      'करियर पथ मिलान...',
      'छात्रवृत्ति के अवसर ढूँढना...',
      'व्यक्तिगत रोडमैप बनाना...',
      'AI अंतर्दृष्टि उत्पन्न करना...',
    ],
  },
  kn: {
    settingsLabel: 'ಡೆವಲಪರ್ ಸೆಟ್ಟಿಂಗ್ಸ್',
    settingsLabelKn: '',
    saveKey: 'ಕೀ ಉಳಿಸಿ',
    headerSub: 'ಗ್ರಾಮೀಣ ಕರ್ನಾಟಕದ ಭವಿಷ್ಯವನ್ನು ಸಶಕ್ತಗೊಳಿಸುವುದು',
    headerSubKn: '',
    labelClass: 'ಪ್ರಸ್ತುತ ತರಗತಿ / ಗ್ರೇಡ್',
    labelClassKn: '',
    labelMarks: 'ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಕ್ಷಮತೆ',
    labelMarksKn: '',
    labelSubjects: 'ಬಲವಾದ ವಿಷಯಗಳು',
    labelSubjectsOptional: '(ಐಚ್ಛಿಕ)',
    labelInterest: 'ನಿಮಗೆ ನಿಜವಾಗಿಯೂ ಯಾವುದರ ಬಗ್ಗೆ ಆಸಕ್ತಿ ಇದೆ?',
    labelInterestKn: '',
    hintMarks: 'ನಿಮ್ಮ ಕೊನೆಯ ಮುಖ್ಯ ಪರೀಕ್ಷೆಗಳ ಒಟ್ಟಾರೆ ಶೇಕಡಾವಾರು.',
    hintSubjects: 'ನೀವು ಸ್ವಾಭಾವಿಕವಾಗಿ ಯಾವುದರಲ್ಲಿ ಉತ್ತಮರು?',
    hintInterest: 'ನಿಮ್ಮ ಸ್ವಂತ ಮಾತುಗಳಲ್ಲಿ ಮುಕ್ತವಾಗಿ ಬರೆಯಿರಿ. ವೃತ್ತಿಪರವಾಗಿ ಧ್ವನಿಸುವ ಬಗ್ಗೆ ಚಿಂತಿಸಬೇಡಿ.',
    marksPlaceholder: 'ಉದಾ: 65%, B+, 8.5 CGPA',
    subjectsPlaceholder: 'ಉದಾ: ಕನ್ನಡ, ಸಮಾಜ ವಿಜ್ಞಾನ',
    interestPlaceholder: 'ನಿಮ್ಮ ಕಥೆ ಮತ್ತು ಆಸಕ್ತಿಗಳನ್ನು ಹೇಳಿ...',
    btnSubmit: 'ನನ್ನ ಮಾರ್ಗ ಕಂಡುಕೊಳ್ಳಿ',
    loadingTitle: 'ನಿಮ್ಮ ವಿಶಿಷ್ಟ ಪ್ರೊಫೈಲ್ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
    loadingDesc:
      'ಕರ್ನಾಟಕದಲ್ಲಿ ನಿಮಗಾಗಿ ಅತ್ಯುತ್ತಮ ಶೈಕ್ಷಣಿಕ ಮತ್ತು ವೃತ್ತಿಪರ ಅವಕಾಶಗಳನ್ನು ನಕ್ಷೆ ಮಾಡಲಾಗುತ್ತಿದೆ.',
    errorTitle: 'ಏನೋ ತಪ್ಪಾಗಿದೆ',
    errorMsg: 'ದೋಷ ಸಂಭವಿಸಿದೆ.',
    noKeyError:
      'API ಕೀ ಕಾಣೆಯಾಗಿದೆ. ದಯವಿಟ್ಟು ಮೇಲಿನ ಡೆವಲಪರ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ನಿಮ್ಮ API ಕೀಯನ್ನು ನಮೂದಿಸಿ.',
    processing: 'ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...',
    noContent: 'ಯಾವುದೇ ವಿಷಯ ಲಭ್ಯವಿಲ್ಲ.',
    section1: 'ಶೈಕ್ಷಣಿಕ ಜೋಡಣೆ',
    section2: 'ಆಸಕ್ತಿ ಸೇತುವೆ ಮತ್ತು ರಸ್ತೆ ನಕ್ಷೆ',
    section3: 'ಸ್ಪರ್ಧಾತ್ಮಕ ಹಾರಿಜಾನ್‌ಗಳು',
    keySaved: 'API ಕೀ ಸ್ಥಳೀಯವಾಗಿ ಉಳಿಸಲಾಗಿದೆ!',
    keyRemoved: 'API ಕೀ ತೆಗೆದುಹಾಕಲಾಗಿದೆ.',
    backBtn: '← ಫಾರ್ಮ್‌ಗೆ ಹಿಂತಿರುಗಿ',
    logoutBtn: '← ಲಾಗಿನ್‌ಗೆ ಹಿಂತಿರುಗಿ',
    classOptions: [
      { value: '', label: 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಶಿಕ್ಷಣ ಮಟ್ಟ ಆಯ್ಕೆಮಾಡಿ' },
      { value: 'Class 8', label: 'ಕಕ್ಷೆ 8' },
      { value: 'Class 9', label: 'ಕಕ್ಷೆ 9' },
      { value: 'Class 10 (SSLC)', label: 'ಕಕ್ಷೆ 10 / SSLC' },
      { value: 'Class 11 (1st PUC)', label: 'ಕಕ್ಷೆ 11 / 1st PUC' },
      { value: 'Class 12 (2nd PUC)', label: 'ಕಕ್ಷೆ 12 / 2nd PUC' },
      { value: 'Diploma/ITI', label: 'ಡಿಪ್ಲೊಮಾ / ITI' },
      { value: 'Degree 1st Year', label: 'ಪದವಿ 1ನೇ ವರ್ಷ' },
    ],
    aiLang: 'You MUST respond in Kannada (ಕನ್ನಡ). Keep section content in Kannada only.',
    loadingSteps: [
      'ಶೈಕ್ಷಣಿಕ ಸಾಮರ್ಥ್ಯ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      'ವೃತ್ತಿ ಮಾರ್ಗಗಳನ್ನು ಹೊಂದಿಸಲಾಗುತ್ತಿದೆ...',
      'ವಿದ್ಯಾರ್ಥಿವೇತನ ಅವಕಾಶಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...',
      'ವೈಯಕ್ತಿಕ ರಸ್ತೆ ನಕ್ಷೆ ನಿರ್ಮಿಸಲಾಗುತ್ತಿದೆ...',
      'AI ಒಳನೋಟಗಳನ್ನು ಉತ್ಪಾದಿಸಲಾಗುತ್ತಿದೆ...',
    ],
  },
};
