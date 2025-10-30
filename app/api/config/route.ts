import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        let config = await prisma.config.findFirst();
        if (!config) {
            config = await prisma.config.create({
                data: { step2: ["aboutMe"], step3: ["address"] },
            });
        }
        return NextResponse.json(config);
    } catch (err) {
        console.error("GET /api/config error:", err);
        return NextResponse.json({ error: "Failed to fetch config" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Ensure both step2 and step3 have at least one field
        if (!body.step2?.length || !body.step3?.length) {
            return NextResponse.json(
                { error: "Each step must have at least one component." },
                { status: 400 }
            );
        }

        const config = await prisma.config.upsert({
            where: { id: 1 },
            update: { step2: body.step2, step3: body.step3 },
            create: { id: 1, step2: body.step2, step3: body.step3 },
        });

        return NextResponse.json(config);
    } catch (err) {
        console.error("POST /api/config error:", err);
        return NextResponse.json({ error: "Failed to save configuration" }, { status: 500 });
    }
}
