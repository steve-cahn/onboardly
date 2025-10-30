type User = {
    id: string;
    email: string;
    progress: number;
    aboutMe?: string | null;
    street?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    birthdate?: string | null;
};
