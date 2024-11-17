import React from "react"
import { EmailListItem } from ".";


interface EmailFrom {
    name: string;
    email: string;
}

interface EmailData {
    id: string;
    from: EmailFrom;
    subject: string;
    short_description: string;
    date: string;
}

interface RootStore {
    Email: {
        Email: EmailData[];
    };
}




const EmailList = ({
    emails,
    selectedId,
    onEmailSelect,
    onFavoriteToggle
}: {
    emails: EmailData[];
    selectedId: string | null;
    onEmailSelect: (id: string) => void;
    onFavoriteToggle: (id: string) => void;
}) => (
    <section className="w-1/2 overflow-y-auto p-4 border-r border-gray-200">
        <ul className="space-y-4">
            {emails.length === 0 && <div className="text-gray-500 text-center">No emails found.</div>} {emails.map((email) => (
                <EmailListItem
                    key={email.id}
                    email={email}
                    isSelected={selectedId === email.id}
                    onClick={() => onEmailSelect(email.id)}
                    onFavoriteToggle={onFavoriteToggle}
                />
            ))}
        </ul>
    </section>
);




export default EmailList