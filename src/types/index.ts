interface EmailFrom {
    name: string;
    email: string;
}

export interface EmailData {
    id: string;
    from: EmailFrom;
    subject: string;
    short_description: string;
    date: string;
}

export interface RootStore {
    Email: {
        Email: EmailData[];
    };
}

