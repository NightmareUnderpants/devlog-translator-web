"use client";

import { useCallback, useState } from "react";

import {
  readCachedTranslation,
  writeCachedTranslation,
} from "@/lib/translation-cache";
import { translateText } from "@/lib/translate-client";

interface UseTranslationParams {
  sourceLanguage: string;
  targetLanguage: string;
  text: string;
}

export function useTranslation({
  sourceLanguage,
  targetLanguage,
  text,
}: UseTranslationParams) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [outputText, setOutputText] = useState("");
  const [detectedCode, setDetectedCode] = useState("");

  const clearTranslation = useCallback(() => {
    setError("");
    setOutputText("");
    setDetectedCode("");
  }, []);

  const translate = useCallback(async () => {
    const sourceText = text.trim();
    if (!sourceText) return;

    setLoading(true);
    setError("");
    setOutputText("");
    setDetectedCode("");

    try {
      const savedTranslation = readCachedTranslation(
        sourceLanguage,
        targetLanguage,
        sourceText,
      );

      if (savedTranslation) {
        setOutputText(savedTranslation.text);
        setDetectedCode(savedTranslation.detectedLanguageCode ?? "");
        return;
      }

      const translation = await translateText({
        sourceLanguage,
        targetLanguage,
        text: sourceText,
      });

      if (translation) {
        setOutputText(translation.text);
        setDetectedCode(translation.detectedLanguageCode ?? "");
        writeCachedTranslation(
          sourceLanguage,
          targetLanguage,
          sourceText,
          translation,
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [sourceLanguage, targetLanguage, text]);

  return {
    clearTranslation,
    detectedCode,
    error,
    loading,
    outputText,
    translate,
  };
}
