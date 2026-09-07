export type ServiceContent = {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** AI qidiruvi uchun qisqa, aniq javob — sahifa boshida (6.6-band) */
  quickAnswer: string;
  problemParagraphs: string[];
  practicalTips: { title: string; text: string }[];
  howIHelp: string[];
  processSteps: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
};
