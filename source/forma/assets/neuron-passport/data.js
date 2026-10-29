import { DEFAULT_LIGHTING, normalizeLighting } from "./lighting.js?v=3.18.6";
export { DEFAULT_LIGHTING, normalizeLighting };

export const video = {
  id: "vlog-julia",
  title: "Um vlog em Nova York",
  creator: "Julia Huynh",
  url: "https://www.youtube.com/watch?v=HLDPA3FTUJ4",
  language: "en",
};
export const excerpts = [
  {
    id: "v01",
    phrase: "This is my last day",
    translation: "Este é meu último dia.",
    time: "24:10–24:18",
    seconds: 1450,
    topic: "Possessivos e demonstrativos",
    explanation:
      "“This” aponta para algo. “My” diz que é meu. Aqui, ela fala do último dia.",
    word: "last",
    meaning: "último",
    prompt: "This is my ___ day",
    hint: "Pense no fim de uma sequência.",
    topicHelp: "Dizer “isto” e “meu”",
    status: "automatic",
  },
  {
    id: "v02",
    phrase: "I’m learning",
    translation: "Estou aprendendo.",
    time: "25:12–25:16",
    seconds: 1512,
    topic: "Ações em andamento",
    explanation:
      "“I’m” é a forma curta de “I am”. “Learning” diz que o aprendizado está acontecendo.",
    word: "learning",
    meaning: "aprendendo",
    prompt: "I’m ___",
    hint: "O que você está fazendo ao estudar um idioma?",
    topicHelp: "Falar do que está acontecendo",
    status: "automatic",
  },
  {
    id: "v03",
    phrase: "It’s so cold",
    translation: "Está muito frio.",
    time: "25:52–25:59",
    seconds: 1552,
    topic: "Adjetivos e intensidade",
    explanation:
      "“Cold” descreve algo frio. “So” reforça a ideia. O contexto exato ainda precisa ser conferido no áudio.",
    word: "cold",
    meaning: "frio",
    prompt: "It’s so ___",
    hint: "Pense no contrário de quente.",
    topicHelp: "Descrever e dar intensidade",
    status: "automatic",
  },
];
export const nav = [
  ["hoje", "calendar", "Início"],
  ["biblioteca", "layout-grid", "Meus vídeos"],
  ["plano", "book", "Meu caminho"],
  ["nivelamento", "language", "Meu ponto de partida"],
  ["revisoes", "refresh", "Minhas palavras"],
  ["topicos", "tag", "Exemplos por assunto"],
  ["emrys", "language", "Organizar exemplos"],
  ["preferencias", "settings", "Configurações"],
];
export function normalizeProfileIdentity(profile = {}) {
  return {
    name: typeof profile?.name === 'string' ? profile.name.trim().slice(0, 100) : '',
    role: typeof profile?.role === 'string' ? profile.role.trim().slice(0, 80) : '',
    materialVariant: Number.isInteger(profile?.materialVariant) && profile.materialVariant >= 0 && profile.materialVariant < 120 ? profile.materialVariant : 0,
  };
}
export const defaultState = {
  profile: { name: "", role: "", materialVariant: 0, goal: "Entender vídeos do dia a dia", level: "zero" },
  profiles: {},
  passports: [],
  passport: { country: "", nativeLanguage: "Português", bio: "", photo: "" },
  sidebarCollapsed: false,
  preferences: {
    theme: "dark",
    accent: "sage",
    density: "comfortable",
    motion: "system",
    contrast: "standard",
    material: "dimensional",
    passportSkin: "tide",
    lighting: DEFAULT_LIGHTING,
  },
  language: "en",
  savedWords: [],
  practiceLog: [],
  links: {},
  materials: [],
};
export const languages = { en: "Inglês", fr: "Francês", ja: "Japonês" };
// Static country/region choices bundled from country-list and mledoze/countries.
// Selection is a profile display preference; it does not infer citizenship, language, or fluency.
export const passportCountries = [
  {
    "code": "AF",
    "name": "Afeganistão",
    "flag": "🇦🇫"
  },
  {
    "code": "AL",
    "name": "Albânia",
    "flag": "🇦🇱"
  },
  {
    "code": "DE",
    "name": "Alemanha",
    "flag": "🇩🇪"
  },
  {
    "code": "AD",
    "name": "Andorra",
    "flag": "🇦🇩"
  },
  {
    "code": "AO",
    "name": "Angola",
    "flag": "🇦🇴"
  },
  {
    "code": "AG",
    "name": "Antígua e Barbuda",
    "flag": "🇦🇬"
  },
  {
    "code": "AR",
    "name": "Argentina",
    "flag": "🇦🇷"
  },
  {
    "code": "DZ",
    "name": "Argélia",
    "flag": "🇩🇿"
  },
  {
    "code": "AM",
    "name": "Armênia",
    "flag": "🇦🇲"
  },
  {
    "code": "SA",
    "name": "Arábia Saudita",
    "flag": "🇸🇦"
  },
  {
    "code": "AU",
    "name": "Austrália",
    "flag": "🇦🇺"
  },
  {
    "code": "AZ",
    "name": "Azerbaijão",
    "flag": "🇦🇿"
  },
  {
    "code": "BS",
    "name": "Bahamas",
    "flag": "🇧🇸"
  },
  {
    "code": "BH",
    "name": "Bahrein",
    "flag": "🇧🇭"
  },
  {
    "code": "BD",
    "name": "Bangladesh",
    "flag": "🇧🇩"
  },
  {
    "code": "BB",
    "name": "Barbados",
    "flag": "🇧🇧"
  },
  {
    "code": "BZ",
    "name": "Belize",
    "flag": "🇧🇿"
  },
  {
    "code": "BJ",
    "name": "Benin",
    "flag": "🇧🇯"
  },
  {
    "code": "BY",
    "name": "Bielorrússia",
    "flag": "🇧🇾"
  },
  {
    "code": "BO",
    "name": "Bolívia",
    "flag": "🇧🇴"
  },
  {
    "code": "BW",
    "name": "Botsuana",
    "flag": "🇧🇼"
  },
  {
    "code": "BR",
    "name": "Brasil",
    "flag": "🇧🇷"
  },
  {
    "code": "BN",
    "name": "Brunei",
    "flag": "🇧🇳"
  },
  {
    "code": "BG",
    "name": "Bulgária",
    "flag": "🇧🇬"
  },
  {
    "code": "BF",
    "name": "Burquina Faso",
    "flag": "🇧🇫"
  },
  {
    "code": "BI",
    "name": "Burundi",
    "flag": "🇧🇮"
  },
  {
    "code": "BT",
    "name": "Butão",
    "flag": "🇧🇹"
  },
  {
    "code": "BE",
    "name": "Bélgica",
    "flag": "🇧🇪"
  },
  {
    "code": "BA",
    "name": "Bósnia e Herzegovina",
    "flag": "🇧🇦"
  },
  {
    "code": "CV",
    "name": "Cabo Verde",
    "flag": "🇨🇻"
  },
  {
    "code": "CM",
    "name": "Camarões",
    "flag": "🇨🇲"
  },
  {
    "code": "KH",
    "name": "Camboja",
    "flag": "🇰🇭"
  },
  {
    "code": "CA",
    "name": "Canadá",
    "flag": "🇨🇦"
  },
  {
    "code": "QA",
    "name": "Catar",
    "flag": "🇶🇦"
  },
  {
    "code": "KZ",
    "name": "Cazaquistão",
    "flag": "🇰🇿"
  },
  {
    "code": "TD",
    "name": "Chade",
    "flag": "🇹🇩"
  },
  {
    "code": "CL",
    "name": "Chile",
    "flag": "🇨🇱"
  },
  {
    "code": "CN",
    "name": "China",
    "flag": "🇨🇳"
  },
  {
    "code": "CY",
    "name": "Chipre",
    "flag": "🇨🇾"
  },
  {
    "code": "VA",
    "name": "Cidade do Vaticano",
    "flag": "🇻🇦"
  },
  {
    "code": "CO",
    "name": "Colômbia",
    "flag": "🇨🇴"
  },
  {
    "code": "KM",
    "name": "Comores",
    "flag": "🇰🇲"
  },
  {
    "code": "CD",
    "name": "Congo - Kinshasa",
    "flag": "🇨🇩"
  },
  {
    "code": "KP",
    "name": "Coreia do Norte",
    "flag": "🇰🇵"
  },
  {
    "code": "KR",
    "name": "Coreia do Sul",
    "flag": "🇰🇷"
  },
  {
    "code": "CI",
    "name": "Costa do Marfim",
    "flag": "🇨🇮"
  },
  {
    "code": "CR",
    "name": "Costa Rica",
    "flag": "🇨🇷"
  },
  {
    "code": "HR",
    "name": "Croácia",
    "flag": "🇭🇷"
  },
  {
    "code": "CU",
    "name": "Cuba",
    "flag": "🇨🇺"
  },
  {
    "code": "DK",
    "name": "Dinamarca",
    "flag": "🇩🇰"
  },
  {
    "code": "DJ",
    "name": "Djibuti",
    "flag": "🇩🇯"
  },
  {
    "code": "DM",
    "name": "Dominica",
    "flag": "🇩🇲"
  },
  {
    "code": "EG",
    "name": "Egito",
    "flag": "🇪🇬"
  },
  {
    "code": "SV",
    "name": "El Salvador",
    "flag": "🇸🇻"
  },
  {
    "code": "AE",
    "name": "Emirados Árabes Unidos",
    "flag": "🇦🇪"
  },
  {
    "code": "EC",
    "name": "Equador",
    "flag": "🇪🇨"
  },
  {
    "code": "ER",
    "name": "Eritreia",
    "flag": "🇪🇷"
  },
  {
    "code": "SK",
    "name": "Eslováquia",
    "flag": "🇸🇰"
  },
  {
    "code": "SI",
    "name": "Eslovênia",
    "flag": "🇸🇮"
  },
  {
    "code": "ES",
    "name": "Espanha",
    "flag": "🇪🇸"
  },
  {
    "code": "SZ",
    "name": "Essuatíni",
    "flag": "🇸🇿"
  },
  {
    "code": "US",
    "name": "Estados Unidos",
    "flag": "🇺🇸"
  },
  {
    "code": "EE",
    "name": "Estônia",
    "flag": "🇪🇪"
  },
  {
    "code": "ET",
    "name": "Etiópia",
    "flag": "🇪🇹"
  },
  {
    "code": "FJ",
    "name": "Fiji",
    "flag": "🇫🇯"
  },
  {
    "code": "PH",
    "name": "Filipinas",
    "flag": "🇵🇭"
  },
  {
    "code": "FI",
    "name": "Finlândia",
    "flag": "🇫🇮"
  },
  {
    "code": "FR",
    "name": "França",
    "flag": "🇫🇷"
  },
  {
    "code": "GA",
    "name": "Gabão",
    "flag": "🇬🇦"
  },
  {
    "code": "GH",
    "name": "Gana",
    "flag": "🇬🇭"
  },
  {
    "code": "GE",
    "name": "Geórgia",
    "flag": "🇬🇪"
  },
  {
    "code": "GD",
    "name": "Granada",
    "flag": "🇬🇩"
  },
  {
    "code": "GR",
    "name": "Grécia",
    "flag": "🇬🇷"
  },
  {
    "code": "GT",
    "name": "Guatemala",
    "flag": "🇬🇹"
  },
  {
    "code": "GY",
    "name": "Guiana",
    "flag": "🇬🇾"
  },
  {
    "code": "GN",
    "name": "Guiné",
    "flag": "🇬🇳"
  },
  {
    "code": "GQ",
    "name": "Guiné Equatorial",
    "flag": "🇬🇶"
  },
  {
    "code": "GW",
    "name": "Guiné-Bissau",
    "flag": "🇬🇼"
  },
  {
    "code": "GM",
    "name": "Gâmbia",
    "flag": "🇬🇲"
  },
  {
    "code": "HT",
    "name": "Haiti",
    "flag": "🇭🇹"
  },
  {
    "code": "HN",
    "name": "Honduras",
    "flag": "🇭🇳"
  },
  {
    "code": "HK",
    "name": "Hong Kong, RAE da China",
    "flag": "🇭🇰"
  },
  {
    "code": "HU",
    "name": "Hungria",
    "flag": "🇭🇺"
  },
  {
    "code": "MH",
    "name": "Ilhas Marshall",
    "flag": "🇲🇭"
  },
  {
    "code": "SB",
    "name": "Ilhas Salomão",
    "flag": "🇸🇧"
  },
  {
    "code": "ID",
    "name": "Indonésia",
    "flag": "🇮🇩"
  },
  {
    "code": "IQ",
    "name": "Iraque",
    "flag": "🇮🇶"
  },
  {
    "code": "IE",
    "name": "Irlanda",
    "flag": "🇮🇪"
  },
  {
    "code": "IR",
    "name": "Irã",
    "flag": "🇮🇷"
  },
  {
    "code": "IS",
    "name": "Islândia",
    "flag": "🇮🇸"
  },
  {
    "code": "IL",
    "name": "Israel",
    "flag": "🇮🇱"
  },
  {
    "code": "IT",
    "name": "Itália",
    "flag": "🇮🇹"
  },
  {
    "code": "YE",
    "name": "Iêmen",
    "flag": "🇾🇪"
  },
  {
    "code": "JM",
    "name": "Jamaica",
    "flag": "🇯🇲"
  },
  {
    "code": "JP",
    "name": "Japão",
    "flag": "🇯🇵"
  },
  {
    "code": "JO",
    "name": "Jordânia",
    "flag": "🇯🇴"
  },
  {
    "code": "XK",
    "name": "Kosovo",
    "flag": "🇽🇰"
  },
  {
    "code": "KW",
    "name": "Kuwait",
    "flag": "🇰🇼"
  },
  {
    "code": "LA",
    "name": "Laos",
    "flag": "🇱🇦"
  },
  {
    "code": "LS",
    "name": "Lesoto",
    "flag": "🇱🇸"
  },
  {
    "code": "LV",
    "name": "Letônia",
    "flag": "🇱🇻"
  },
  {
    "code": "LR",
    "name": "Libéria",
    "flag": "🇱🇷"
  },
  {
    "code": "LI",
    "name": "Liechtenstein",
    "flag": "🇱🇮"
  },
  {
    "code": "LT",
    "name": "Lituânia",
    "flag": "🇱🇹"
  },
  {
    "code": "LU",
    "name": "Luxemburgo",
    "flag": "🇱🇺"
  },
  {
    "code": "LB",
    "name": "Líbano",
    "flag": "🇱🇧"
  },
  {
    "code": "LY",
    "name": "Líbia",
    "flag": "🇱🇾"
  },
  {
    "code": "MO",
    "name": "Macau, RAE da China",
    "flag": "🇲🇴"
  },
  {
    "code": "MK",
    "name": "Macedônia do Norte",
    "flag": "🇲🇰"
  },
  {
    "code": "MG",
    "name": "Madagascar",
    "flag": "🇲🇬"
  },
  {
    "code": "MW",
    "name": "Malaui",
    "flag": "🇲🇼"
  },
  {
    "code": "MV",
    "name": "Maldivas",
    "flag": "🇲🇻"
  },
  {
    "code": "ML",
    "name": "Mali",
    "flag": "🇲🇱"
  },
  {
    "code": "MT",
    "name": "Malta",
    "flag": "🇲🇹"
  },
  {
    "code": "MY",
    "name": "Malásia",
    "flag": "🇲🇾"
  },
  {
    "code": "MA",
    "name": "Marrocos",
    "flag": "🇲🇦"
  },
  {
    "code": "MR",
    "name": "Mauritânia",
    "flag": "🇲🇷"
  },
  {
    "code": "MU",
    "name": "Maurício",
    "flag": "🇲🇺"
  },
  {
    "code": "MM",
    "name": "Mianmar (Birmânia)",
    "flag": "🇲🇲"
  },
  {
    "code": "FM",
    "name": "Micronésia",
    "flag": "🇫🇲"
  },
  {
    "code": "MD",
    "name": "Moldova",
    "flag": "🇲🇩"
  },
  {
    "code": "MN",
    "name": "Mongólia",
    "flag": "🇲🇳"
  },
  {
    "code": "ME",
    "name": "Montenegro",
    "flag": "🇲🇪"
  },
  {
    "code": "MZ",
    "name": "Moçambique",
    "flag": "🇲🇿"
  },
  {
    "code": "MX",
    "name": "México",
    "flag": "🇲🇽"
  },
  {
    "code": "MC",
    "name": "Mônaco",
    "flag": "🇲🇨"
  },
  {
    "code": "NA",
    "name": "Namíbia",
    "flag": "🇳🇦"
  },
  {
    "code": "NR",
    "name": "Nauru",
    "flag": "🇳🇷"
  },
  {
    "code": "NP",
    "name": "Nepal",
    "flag": "🇳🇵"
  },
  {
    "code": "NI",
    "name": "Nicarágua",
    "flag": "🇳🇮"
  },
  {
    "code": "NG",
    "name": "Nigéria",
    "flag": "🇳🇬"
  },
  {
    "code": "NO",
    "name": "Noruega",
    "flag": "🇳🇴"
  },
  {
    "code": "NZ",
    "name": "Nova Zelândia",
    "flag": "🇳🇿"
  },
  {
    "code": "NE",
    "name": "Níger",
    "flag": "🇳🇪"
  },
  {
    "code": "OM",
    "name": "Omã",
    "flag": "🇴🇲"
  },
  {
    "code": "PW",
    "name": "Palau",
    "flag": "🇵🇼"
  },
  {
    "code": "PA",
    "name": "Panamá",
    "flag": "🇵🇦"
  },
  {
    "code": "PG",
    "name": "Papua-Nova Guiné",
    "flag": "🇵🇬"
  },
  {
    "code": "PK",
    "name": "Paquistão",
    "flag": "🇵🇰"
  },
  {
    "code": "PY",
    "name": "Paraguai",
    "flag": "🇵🇾"
  },
  {
    "code": "NL",
    "name": "Países Baixos",
    "flag": "🇳🇱"
  },
  {
    "code": "PE",
    "name": "Peru",
    "flag": "🇵🇪"
  },
  {
    "code": "PL",
    "name": "Polônia",
    "flag": "🇵🇱"
  },
  {
    "code": "PT",
    "name": "Portugal",
    "flag": "🇵🇹"
  },
  {
    "code": "KG",
    "name": "Quirguistão",
    "flag": "🇰🇬"
  },
  {
    "code": "KI",
    "name": "Quiribati",
    "flag": "🇰🇮"
  },
  {
    "code": "KE",
    "name": "Quênia",
    "flag": "🇰🇪"
  },
  {
    "code": "GB",
    "name": "Reino Unido",
    "flag": "🇬🇧"
  },
  {
    "code": "CF",
    "name": "República Centro-Africana",
    "flag": "🇨🇫"
  },
  {
    "code": "CG",
    "name": "República do Congo",
    "flag": "🇨🇬"
  },
  {
    "code": "DO",
    "name": "República Dominicana",
    "flag": "🇩🇴"
  },
  {
    "code": "RO",
    "name": "Romênia",
    "flag": "🇷🇴"
  },
  {
    "code": "RW",
    "name": "Ruanda",
    "flag": "🇷🇼"
  },
  {
    "code": "RU",
    "name": "Rússia",
    "flag": "🇷🇺"
  },
  {
    "code": "WS",
    "name": "Samoa",
    "flag": "🇼🇸"
  },
  {
    "code": "SM",
    "name": "San Marino",
    "flag": "🇸🇲"
  },
  {
    "code": "LC",
    "name": "Santa Lúcia",
    "flag": "🇱🇨"
  },
  {
    "code": "SC",
    "name": "Seicheles",
    "flag": "🇸🇨"
  },
  {
    "code": "SN",
    "name": "Senegal",
    "flag": "🇸🇳"
  },
  {
    "code": "SL",
    "name": "Serra Leoa",
    "flag": "🇸🇱"
  },
  {
    "code": "SG",
    "name": "Singapura",
    "flag": "🇸🇬"
  },
  {
    "code": "SO",
    "name": "Somália",
    "flag": "🇸🇴"
  },
  {
    "code": "LK",
    "name": "Sri Lanka",
    "flag": "🇱🇰"
  },
  {
    "code": "SD",
    "name": "Sudão",
    "flag": "🇸🇩"
  },
  {
    "code": "SS",
    "name": "Sudão do Sul",
    "flag": "🇸🇸"
  },
  {
    "code": "SR",
    "name": "Suriname",
    "flag": "🇸🇷"
  },
  {
    "code": "SE",
    "name": "Suécia",
    "flag": "🇸🇪"
  },
  {
    "code": "CH",
    "name": "Suíça",
    "flag": "🇨🇭"
  },
  {
    "code": "KN",
    "name": "São Cristóvão e Névis",
    "flag": "🇰🇳"
  },
  {
    "code": "ST",
    "name": "São Tomé e Príncipe",
    "flag": "🇸🇹"
  },
  {
    "code": "VC",
    "name": "São Vicente e Granadinas",
    "flag": "🇻🇨"
  },
  {
    "code": "RS",
    "name": "Sérvia",
    "flag": "🇷🇸"
  },
  {
    "code": "SY",
    "name": "Síria",
    "flag": "🇸🇾"
  },
  {
    "code": "TJ",
    "name": "Tadjiquistão",
    "flag": "🇹🇯"
  },
  {
    "code": "TH",
    "name": "Tailândia",
    "flag": "🇹🇭"
  },
  {
    "code": "TW",
    "name": "Taiwan",
    "flag": "🇹🇼"
  },
  {
    "code": "TZ",
    "name": "Tanzânia",
    "flag": "🇹🇿"
  },
  {
    "code": "CZ",
    "name": "Tchéquia",
    "flag": "🇨🇿"
  },
  {
    "code": "PS",
    "name": "Territórios palestinos",
    "flag": "🇵🇸"
  },
  {
    "code": "TL",
    "name": "Timor-Leste",
    "flag": "🇹🇱"
  },
  {
    "code": "TG",
    "name": "Togo",
    "flag": "🇹🇬"
  },
  {
    "code": "TO",
    "name": "Tonga",
    "flag": "🇹🇴"
  },
  {
    "code": "TT",
    "name": "Trinidad e Tobago",
    "flag": "🇹🇹"
  },
  {
    "code": "TN",
    "name": "Tunísia",
    "flag": "🇹🇳"
  },
  {
    "code": "TM",
    "name": "Turcomenistão",
    "flag": "🇹🇲"
  },
  {
    "code": "TR",
    "name": "Turquia",
    "flag": "🇹🇷"
  },
  {
    "code": "TV",
    "name": "Tuvalu",
    "flag": "🇹🇻"
  },
  {
    "code": "UA",
    "name": "Ucrânia",
    "flag": "🇺🇦"
  },
  {
    "code": "UG",
    "name": "Uganda",
    "flag": "🇺🇬"
  },
  {
    "code": "UY",
    "name": "Uruguai",
    "flag": "🇺🇾"
  },
  {
    "code": "UZ",
    "name": "Uzbequistão",
    "flag": "🇺🇿"
  },
  {
    "code": "VU",
    "name": "Vanuatu",
    "flag": "🇻🇺"
  },
  {
    "code": "VE",
    "name": "Venezuela",
    "flag": "🇻🇪"
  },
  {
    "code": "VN",
    "name": "Vietnã",
    "flag": "🇻🇳"
  },
  {
    "code": "ZW",
    "name": "Zimbábue",
    "flag": "🇿🇼"
  },
  {
    "code": "ZM",
    "name": "Zâmbia",
    "flag": "🇿🇲"
  },
  {
    "code": "ZA",
    "name": "África do Sul",
    "flag": "🇿🇦"
  },
  {
    "code": "AT",
    "name": "Áustria",
    "flag": "🇦🇹"
  },
  {
    "code": "IN",
    "name": "Índia",
    "flag": "🇮🇳"
  }
];

export const levels = {
  zero: "Começando do zero",
  beginner: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
};
