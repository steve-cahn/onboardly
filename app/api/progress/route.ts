import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH { email, progress }
export async function PATCH(req: Request) {
    const { email, progress } = await req.json();
    if (!email || typeof progress !== "number") {
        return NextResponse.json({ error: "email and progress required" }, { status: 400 });
    }
    const updated = await prisma.user.update({
        where: { email },
        data: { progress },
    });
    return NextResponse.json(updated);
}
