"use client";

import { useCallback, useState } from "react";

import { cardColors } from "@/lib/posts";

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

export interface TranslateResult {
  text: string;
  detectedLanguageCode?: string;
}

const API_BASE = "/api";
const STORAGE_KEY_PREFIX = "devlog-translation";

async function readJsonResponse<T>(response: Response): Promise<T> {
  const text = await response.text();

  if (!text.trim()) {
    throw new Error(
      response.ok
        ? "API returned an empty response"
        : `API request failed (${response.status}) with an empty response`,
    );
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(
      response.ok
        ? "API returned an invalid JSON response"
        : `API request failed (${response.status}): ${text.slice(0, 200)}`,
    );
  }
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [outputText, setOutputText] = useState("");
  const [detectedCode, setDetectedCode] = useState("");

  const handleTranslate = useCallback(async () => {
    const text = description.trim();
    if (!text) return;

    const storageKey = `${STORAGE_KEY_PREFIX}:${sourceLanguage}:${targetLanguage}:${text}`;

    setLoading(true);
    setError("");
    setOutputText("");
    setDetectedCode("");

    try {
      const savedTranslation = localStorage.getItem(storageKey);
      if (savedTranslation) {
        const translation = JSON.parse(savedTranslation) as TranslateResult;
        setOutputText(translation.text);
        setDetectedCode(translation.detectedLanguageCode ?? "");
        return;
      }

      const response = await fetch(`${API_BASE}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceLanguageCode: sourceLanguage,
          targetLanguageCode: targetLanguage,
          texts: [text],
        }),
      });

      const data = await readJsonResponse<{
        error?: string;
        translations?: TranslateResult[];
      }>(response);

      if (!response.ok) {
        throw new Error(data.error || "Translation failed");
      }

      const translation = data.translations?.[0];
      if (translation) {
        setOutputText(translation.text);
        setDetectedCode(translation.detectedLanguageCode ?? "");
        localStorage.setItem(storageKey, JSON.stringify(translation));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [description, sourceLanguage, targetLanguage]);

  return (
    <article
      className="w-full overflow-hidden rounded-lg text-white shadow-lg"
      style={{ backgroundColor }}
    >
      <div
        className="relative h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 35%, ${backgroundColor} 100%)`,
          }}
        />
      </div>

      <div className="space-y-4 p-6 pt-2">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{title}</h2>
          {(author || createdAt) && (
            <p className="text-sm text-white/65">
              {[author, createdAt].filter(Boolean).join(" | ")}
            </p>
          )}
        </div>

        <p className="text-justify leading-7 text-white/80">{description}</p>

        {outputText && (
          <div className="rounded-md bg-white/10 p-4">
            <p className="text-sm font-semibold text-white/70">
              Перевод{detectedCode ? ` (${detectedCode})` : ""}
            </p>
            <p className="mt-2 leading-7 text-white">{outputText}</p>
          </div>
        )}

        {error && <p className="text-sm text-red-200">{error}</p>}

        <button
          type="button"
          onClick={handleTranslate}
          className="inline-flex h-10 items-center justify-center rounded-md bg-white px-4 text-sm font-semibold text-gray-950 transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Перевожу..." : "Перевести"}
        </button>
      </div>
    </article>
  );
}
