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
  /**
   * «Kerakli hujjatlar» bo'limi (4-bosqich). Bo'sh yoki yo'q bo'lsa,
   * bo'lim ko'rsatilmaydi.
   */
  documents?: string[];
  /**
   * «Tergovchilik tajribasi afzalligi» blokining shu sahifaga xos matni.
   * Blok faqat services-data.ts da `investigatorAdvantage: true` bo'lgan
   * xizmatlarda chiqadi; matn berilmasa — umumiy matn (messages).
   */
  investigatorNote?: string;
};
