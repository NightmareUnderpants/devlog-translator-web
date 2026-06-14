"use client";

import { useState } from "react";

import CardCover from "@/components/card-cover";
import CardHeader from "@/components/card-header";
import LanguageSelect from "@/components/language-select";
import TranslateButton from "@/components/translate-button";
import TranslationResult from "@/components/translation-result";
import { useTranslation } from "@/hooks/use-translation";
import { cardColors } from "@/lib/posts";
import { translationLanguages } from "@/lib/translation-languages";

interface CardProps {
  title: string;
  description: string;
  imageSrc?: string;
  author?: string;
  createdAt?: string;
  backgroundColor?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
}

export default function Card({
  title,
  description,
  imageSrc = "/img/default.jpg",
  author,
  createdAt,
  backgroundColor = cardColors.default,
  sourceLanguage = "ru",
  targetLanguage = "en",
}: CardProps) {
  const [selectedTargetLanguage, setSelectedTargetLanguage] =
    useState(targetLanguage);
  const {
    clearTranslation,
    detectedCode,
    error,
    loading,
    outputText,
    translate,
  } = useTranslation({
    sourceLanguage,
    targetLanguage: selectedTargetLanguage,
    text: description,
  });

  function handleLanguageChange(languageCode: string) {
    clearTranslation();
    setSelectedTargetLanguage(languageCode);
  }

  return (
    <article
      className="w-full overflow-hidden rounded-lg text-white shadow-lg"
      style={{ backgroundColor }}
    >
      <CardCover backgroundColor={backgroundColor} imageSrc={imageSrc} />

      <div className="space-y-4 p-6 pt-2">
        <CardHeader author={author} createdAt={createdAt} title={title} />

        <p className="text-justify leading-7 text-white/80">{description}</p>

        <TranslationResult detectedCode={detectedCode} text={outputText} />

        {error && <p className="text-sm text-red-200">{error}</p>}

        <div className="flex flex-wrap items-end gap-3">
          <LanguageSelect
            disabled={loading}
            languages={translationLanguages}
            onChange={handleLanguageChange}
            value={selectedTargetLanguage}
          />
          <TranslateButton loading={loading} onClick={translate} />
        </div>
      </div>
    </article>
  );
}
