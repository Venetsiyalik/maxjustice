/**
 * O'zbek lotin yozuvidan kirill yozuviga avtomatik transliteratsiya.
 *
 * Texnik topshiriqqa ko'ra (3.2-band): kontent bir marta lotin alifbosida
 * yoziladi va kirill versiyasi shundan avtomatik hosil qilinadi.
 *
 * Qoidaga asoslangan konverter — qoidaviy holatlarning aksariyatini to'g'ri
 * beradi, biroq ba'zi chet so'zlar/chegara holatlar uchun 100% aniqlikni
 * kafolatlamaydi (bu har qanday qoidaviy lotin-kirill konvertori uchun xos).
 */

// Turli apostrof belgilarini bitta standart shaklga keltiramiz (o', g' uchun)
const APOSTROPHE_VARIANTS = /[‘’ʻʼ`´]/g;
const NORMALIZED_APOSTROPHE = "'";

// Ikki va undan ortiq belgili birikmalar — bittalik harflardan OLDIN tekshirilishi shart
const MULTI_CHAR_PAIRS: [string, string][] = [
  ["Yo", "Ё"], ["YO", "Ё"], ["yo", "ё"],
  ["Yu", "Ю"], ["YU", "Ю"], ["yu", "ю"],
  ["Ya", "Я"], ["YA", "Я"], ["ya", "я"],
  ["Sh", "Ш"], ["SH", "Ш"], ["sh", "ш"],
  ["Ch", "Ч"], ["CH", "Ч"], ["ch", "ч"],
  ["O'", "Ў"], ["o'", "ў"],
  ["G'", "Ғ"], ["g'", "ғ"],
];

const SINGLE_CHAR_PAIRS: [string, string][] = [
  ["A", "А"], ["B", "Б"], ["D", "Д"], ["E", "Е"], ["F", "Ф"], ["G", "Г"],
  ["H", "Ҳ"], ["I", "И"], ["J", "Ж"], ["K", "К"], ["L", "Л"], ["M", "М"],
  ["N", "Н"], ["O", "О"], ["P", "П"], ["Q", "Қ"], ["R", "Р"], ["S", "С"],
  ["T", "Т"], ["U", "У"], ["V", "В"], ["X", "Х"], ["Y", "Й"], ["Z", "З"],
  ["a", "а"], ["b", "б"], ["d", "д"], ["e", "е"], ["f", "ф"], ["g", "г"],
  ["h", "ҳ"], ["i", "и"], ["j", "ж"], ["k", "к"], ["l", "л"], ["m", "м"],
  ["n", "н"], ["o", "о"], ["p", "п"], ["q", "қ"], ["r", "р"], ["s", "с"],
  ["t", "т"], ["u", "у"], ["v", "в"], ["x", "х"], ["y", "й"], ["z", "з"],
  // Tutuq belgisi (masalan, "ma'no", "san'at") — o'/g' digraflaridan
  // FARQLI holda qolgan yakka apostrof "ъ" ga o'giriladi
  ["'", "ъ"],
];

const ALL_PAIRS = [...MULTI_CHAR_PAIRS, ...SINGLE_CHAR_PAIRS].sort(
  (a, b) => b[0].length - a[0].length
);

const TRANSLIT_MAP = new Map(ALL_PAIRS);
const PATTERN = new RegExp(
  ALL_PAIRS.map(([latin]) => latin.replace(/[.*+?^${}()|[\]\\']/g, "\\$&")).join("|"),
  "g"
);

/**
 * Brend nomlari kabi o'zbek lotin alifbosidan tashqari harflar (c, w va h.k.)
 * ishlatiladigan iboralar — bular kirill sahifada ham o'zgarishsiz, lotin
 * yozuvida qolishi kerak (aks holda "ЖУСТИCЕ" kabi aralash yozuv chiqadi).
 */
const PROTECTED_TERMS = [
  "MAXLEGAL AND JUSTICE",
  "IMPERIUM LEGAL SOLUTIONS",
  "MAXLEGAL",
  "Google",
  "Yandex",
];

function placeholderFor(index: number) {
  return `@@${index}@@`;
}

/**
 * Bitta matn qatorini lotin yozuvidan kirillga o'giradi.
 * Kirill/raqam/belgilar o'zgarishsiz qoladi.
 */
export function toKirill(text: string): string {
  if (!text) return text;

  let masked = text;
  PROTECTED_TERMS.forEach((term, index) => {
    masked = masked.split(term).join(placeholderFor(index));
  });

  const normalized = masked.replace(APOSTROPHE_VARIANTS, NORMALIZED_APOSTROPHE);
  const transliterated = normalized.replace(
    PATTERN,
    (match) => TRANSLIT_MAP.get(match) ?? match
  );

  let restored = transliterated;
  PROTECTED_TERMS.forEach((term, index) => {
    restored = restored.split(placeholderFor(index)).join(term);
  });

  return restored;
}

/**
 * Obyekt/massiv ichidagi barcha string qiymatlarni rekursiv tarzda
 * kirillga o'giradi. next-intl xabar fayllari (messages) uchun ishlatiladi.
 */
export function transliterateDeep<T>(value: T): T {
  if (typeof value === "string") {
    return toKirill(value) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => transliterateDeep(item)) as unknown as T;
  }
  if (value !== null && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      result[key] = transliterateDeep(val);
    }
    return result as T;
  }
  return value;
}
