interface EmailSender {
    email: string;
    name: string;
}


export interface EmailData {
    id: string;
    from: EmailSender;
    subject: string;
    short_description: string;
    date: number
}

export interface RootStore {
    Email: {
        Email: EmailData[];
    };
}

