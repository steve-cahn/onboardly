"use client";

import { useState, useEffect } from "react";

export type Row = {
    id: string;
    email: string;
    progress: number;
    aboutMe?: string | null;
    street?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    birthdate?: string | null;
    createdAt: string;
};

export function useUsersData() {
    const [rows, setRows] = useState<Row[]>([]);
    const [loading, setLoading] = useState(true);

    async function reload() {
        setLoading(true);
        try {
            const res = await fetch("/api/users", { cache: "no-store" });
            const data = await res.json();
            setRows(data);
        } catch (err) {
            console.error("Failed to load users:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        reload();
    }, []);

    return { rows, loading, reload };
}
