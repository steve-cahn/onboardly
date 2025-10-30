import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// - with ?email=... returns single user
// - without query returns all users
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (email) {
        const user = await prisma.user.findUnique({ where: { email } });
        return NextResponse.json(user);
    }

    const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(users);
}

// Upsert by email; accepts any subset of fields.
export async function POST(req: Request) {
    const data = await req.json();

    if (!data.email) {
        return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    let password = data.password as string | undefined;

    // If password provided and not hashed yet, hash it
    if (password && !password.startsWith("$2a$") && !password.startsWith("$2b$")) {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
    }

    const updateData: any = {
        aboutMe: data.aboutMe ?? undefined,
        street: data.street ?? undefined,
        city: data.city ?? undefined,
        state: data.state ?? undefined,
        zip: data.zip ?? undefined,
        birthdate: data.birthdate ? new Date(data.birthdate) : undefined,
        progress: typeof data.progress === "number" ? data.progress : undefined,
        ...(password ? { password } : {}),
    };

    const createData = {
        email: data.email,
        password: password ?? (await bcrypt.hash("temp", 8)),
        progress: 1,
        aboutMe: null,
        street: null,
        city: null,
        state: null,
        zip: null,
        birthdate: null,
        ...updateData,
    };

    const user = await prisma.user.upsert({
        where: { email: data.email },
        update: updateData,
        create: createData,
    });

    return NextResponse.json(user);
}
