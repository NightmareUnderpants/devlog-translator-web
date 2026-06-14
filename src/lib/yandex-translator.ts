import type { TranslateRequest } from "@/lib/translate-schema";

export type YandexTranslateResult = {
  translations: {
    text: string;
    detectedLanguageCode?: string;
  }[];
};

type YandexErrorResponse = {
  message?: string;
  details?: unknown[];
};

const YANDEX_TRANSLATE_URL =
  "https://translate.api.cloud.yandex.net/translate/v2/translate";

export async function translateWithYandex(
  request: TranslateRequest,
): Promise<YandexTranslateResult> {
  const apiKey = process.env.YANDEX_API_KEY;
  const folderId = process.env.YANDEX_FOLDER_ID;

  if (!apiKey || !folderId) {
    throw new Error("Yandex Translator credentials are not configured");
  }

  const response = await fetch(YANDEX_TRANSLATE_URL, {
    method: "POST",
    headers: {
      Authorization: `Api-Key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      folderId,
      texts: request.texts,
      targetLanguageCode: request.targetLanguageCode,
      ...(request.sourceLanguageCode
        ? { sourceLanguageCode: request.sourceLanguageCode }
        : {}),
    }),
  });

  const data = (await response.json()) as
    | YandexTranslateResult
    | YandexErrorResponse;

  if (!response.ok) {
    throw new Error(
      "message" in data && data.message
        ? data.message
        : `Yandex Translator request failed (${response.status})`,
    );
  }

  return data as YandexTranslateResult;
}
