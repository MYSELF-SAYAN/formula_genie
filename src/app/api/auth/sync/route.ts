import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    if (!userId || userId !== body.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id, email, firstName, lastName, imageUrl } = body;

    await prisma.user.upsert({
      where: { id: id },
      create: {
        id,
        email,
        firstName,
        lastName,
        imageUrl,
      },
      update: {
        email,
        firstName,
        lastName,
        imageUrl,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[AUTH_SYNC_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
