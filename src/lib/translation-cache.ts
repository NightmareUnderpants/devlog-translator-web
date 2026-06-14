import type { TranslateResult } from "@/lib/translate-client";

const STORAGE_KEY_PREFIX = "devlog-translation";

function getTranslationCacheKey(
  sourceLanguage: string,
  targetLanguage: string,
  text: string,
) {
  return `${STORAGE_KEY_PREFIX}:${sourceLanguage}:${targetLanguage}:${text}`;
}

export function readCachedTranslation(
  sourceLanguage: string,
  targetLanguage: string,
  text: string,
) {
  const storageKey = getTranslationCacheKey(sourceLanguage, targetLanguage, text);
  const savedTranslation = localStorage.getItem(storageKey);

  if (!savedTranslation) {
    return null;
  }

  return JSON.parse(savedTranslation) as TranslateResult;
}

export function writeCachedTranslation(
  sourceLanguage: string,
  targetLanguage: string,
  text: string,
  translation: TranslateResult,
) {
  const storageKey = getTranslationCacheKey(sourceLanguage, targetLanguage, text);

  localStorage.setItem(storageKey, JSON.stringify(translation));
}
