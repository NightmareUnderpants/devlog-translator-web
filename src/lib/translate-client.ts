export interface TranslateResult {
  text: string;
  detectedLanguageCode?: string;
}

const API_BASE = "/api";

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

interface TranslateTextParams {
  sourceLanguage: string;
  targetLanguage: string;
  text: string;
}

export async function translateText({
  sourceLanguage,
  targetLanguage,
  text,
}: TranslateTextParams) {
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

  return data.translations?.[0] ?? null;
}
