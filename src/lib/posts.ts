export type GameId = "perceptual" | "walk-me-home" | "jura-new-year";

export type DevlogPost = {
  id: string;
  title: string;
  author: string;
  game: GameId;
  backgroundImage?: string;
  backgroundColor?: string;
  sourceLanguage: string;
  content: string;
  createdAt: string;
};

export const games: { id: GameId; title: string }[] = [
  { id: "perceptual", title: "PERCEPTUAL" },
  { id: "walk-me-home", title: "Walk Me Home" },
  { id: "jura-new-year", title: "Jura: New Year" },
];

export const defaultImage = "/img/default.jpg";

export const cardColors = {
  default: "#172033",
  perceptual: "#172033",
  walkMeHome: "#293241",
  juraNewYear: "#2f3e2f",
};

export const perceptualPosts: DevlogPost[] = [
  {
    id: "perceptual-camera-pass",
    title: "Проход камеры",
    author: "Alex",
    game: "perceptual",
    backgroundImage: "/img/perceptual/1.jpg",
    backgroundColor: cardColors.perceptual,
    sourceLanguage: "ru",
    content:
      "Сегодня я настроил поведение камеры при следовании за игроком и начал проверять, как сцена читается во время движения через узкие пространства.",
    createdAt: "2026-06-10",
  },
  {
    id: "perceptual-ui-prototype",
    title: "Прототип интерфейса",
    author: "Alex",
    game: "perceptual",
    backgroundImage: "/img/perceptual/2.jpg",
    backgroundColor: cardColors.perceptual,
    sourceLanguage: "ru",
    content:
      "Я собрал первую версию меню паузы, панели настроек и небольшого debug-оверлея, чтобы быстрее проверять состояния взаимодействия.",
    createdAt: "2026-06-12",
  },
  {
    id: "perceptual-lighting-test",
    title: "Тест освещения",
    author: "Alex",
    game: "perceptual",
    backgroundImage: defaultImage,
    backgroundColor: cardColors.perceptual,
    sourceLanguage: "ru",
    content:
      "Текущий проход по освещению сфокусирован на контрасте и читаемости. Хочется, чтобы важные объекты выделялись, но сцена не выглядела слишком искусственно.",
    createdAt: "2026-06-14",
  },
];

export const walkMeHomePosts: DevlogPost[] = [
  {
    id: "walk-me-home-first-route",
    title: "Первый маршрут",
    author: "Alex",
    game: "walk-me-home",
    backgroundImage: "/img/walk-me-home/1.png",
    backgroundColor: cardColors.walkMeHome,
    sourceLanguage: "ru",
    content:
      "Я собрал первый играбельный маршрут и начал проверять, достаточно ли спокойно ощущается темп до появления основного напряжения.",
    createdAt: "2026-06-11",
  },
  {
    id: "walk-me-home-sound-pass",
    title: "Проход по звуку",
    author: "Alex",
    game: "walk-me-home",
    backgroundImage: "/img/walk-me-home/1.png",
    backgroundColor: cardColors.walkMeHome,
    sourceLanguage: "ru",
    content:
      "Добавил временную атмосферу и шаги. Даже простые звуки уже делают прогулку более живой и менее пустой.",
    createdAt: "2026-06-13",
  },
  {
    id: "walk-me-home-dialogue-notes",
    title: "Заметки по диалогам",
    author: "Alex",
    game: "walk-me-home",
    backgroundImage: "/img/walk-me-home/1.png",
    backgroundColor: cardColors.walkMeHome,
    sourceLanguage: "ru",
    content:
      "Я набросал несколько коротких диалоговых моментов для дороги домой. Цель — сохранить текст тихим, прямым и немного тревожным.",
    createdAt: "2026-06-16",
  },
];

export const juraNewYearPosts: DevlogPost[] = [
  {
    id: "jura-new-year-snow-test",
    title: "Тест снега",
    author: "Alex",
    game: "jura-new-year",
    backgroundImage: "/img/jura-new-year/1.png",
    backgroundColor: cardColors.juraNewYear,
    sourceLanguage: "ru",
    content:
      "Я протестировал простой эффект снега и настроил плотность так, чтобы он создавал праздничное настроение, но не закрывал важные части сцены.",
    createdAt: "2026-06-09",
  },
  {
    id: "jura-new-year-gift-props",
    title: "Подарки и декор",
    author: "Alex",
    game: "jura-new-year",
    backgroundImage: "/img/jura-new-year/1.png",
    backgroundColor: cardColors.juraNewYear,
    sourceLanguage: "ru",
    content:
      "Начал делать небольшие подарки и декоративные объекты. Они простые, но помогают комнате ощущаться более конкретной и обжитой.",
    createdAt: "2026-06-15",
  },
  {
    id: "jura-new-year-main-menu",
    title: "Главное меню",
    author: "Alex",
    game: "jura-new-year",
    backgroundImage: "/img/jura-new-year/1.png",
    backgroundColor: cardColors.juraNewYear,
    sourceLanguage: "ru",
    content:
      "Первый макет главного меню уже на месте. Я стараюсь сохранить уютное настроение, но при этом сделать кнопки понятными и легко читаемыми.",
    createdAt: "2026-06-17",
  },
];

export const posts: DevlogPost[] = [
  ...perceptualPosts,
  ...walkMeHomePosts,
  ...juraNewYearPosts,
];
