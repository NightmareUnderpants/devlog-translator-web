import { juraNewYearDevlogPosts } from "@/lib/jura-new-year-devlog-posts";
import { perceptualDevlogPosts } from "@/lib/perceptual-devlog-posts";
import { walkMeHomeDevlogPosts } from "@/lib/walk-me-home-devlog-posts";

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

export const defaultImage = "/img/default.jpg";

export const pageBackgroundImages = {
  default: "/img/default-background.png",
  perceptual: "/img/perceptual-background.png",
  walkMeHome: "/img/walk-me-home-background.png",
  juraNewYear: "/img/jura-new-year-background.png",
};

export const cardColors = {
  default: "#172033",
  perceptual: "#231414ff",
  walkMeHome: "#392131ff",
  juraNewYear: "#23233cff",
};

export const games: { id: GameId; title: string; backgroundImage: string }[] = [
  {
    id: "perceptual",
    title: "PERCEPTUAL",
    backgroundImage: pageBackgroundImages.perceptual,
  },
  {
    id: "walk-me-home",
    title: "Walk Me Home",
    backgroundImage: pageBackgroundImages.walkMeHome,
  },
  {
    id: "jura-new-year",
    title: "Jura: New Year",
    backgroundImage: pageBackgroundImages.juraNewYear,
  },
];

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

export const posts: DevlogPost[] = [
  ...perceptualDevlogPosts,
  ...perceptualPosts,
  ...walkMeHomeDevlogPosts,
  ...juraNewYearDevlogPosts,
];
