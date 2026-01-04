import { NextResponse } from "next/server";
import { generateFormattedBody } from "@/lib/validations/generate";
import { generateFormula } from "@/lib/gemini";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = generateFormattedBody.safeParse(body);

    if (!validation.success) {
      return new NextResponse(validation.error.message, { status: 400 });
    }

    const { prompt, platform, userId } = validation.data;

    const { formula, explanation } = await generateFormula(prompt, platform);

    await prisma.generation.create({
      data: {
        userId,
        prompt,
        result: formula,
        explanation,
        platform,
      },
    });

    return NextResponse.json({ formula, explanation });
  } catch (error) {
    console.error("[GENERATE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
