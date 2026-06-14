import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { translateRequestSchema } from "@/lib/translate-schema";
import { translateWithYandex } from "@/lib/yandex-translator";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const translateRequest = translateRequestSchema.parse(body);
    const result = await translateWithYandex(translateRequest);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid translation request", issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected translation error",
      },
      { status: 500 },
    );
  }
}
