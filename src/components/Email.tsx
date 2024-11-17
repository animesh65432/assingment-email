import React from "react";
import { useSelector } from "react-redux";

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

const EmailList: React.FC = () => {
    const emails = useSelector((state: RootStore) => state.Email.Email);

    return (
        <main className="max-w-4xl mx-auto p-2">
            <ul className="space-y-4">
                {emails.map((email) => (
                    <li
                        key={email.id}
                        className="bg-white rounded-lg shadow-md border border-gray-200"
                    >
                        <article className="p-6 flex gap-4">
                            <aside className="flex-shrink-0">
                                <figure className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                                    <figcaption className="text-lg font-semibold text-white">
                                        {email.from.name[0]}
                                    </figcaption>
                                </figure>
                            </aside>

                            <section className="flex-1 min-w-0">
                                <header className="flex justify-between items-start mb-2">
                                    <hgroup className="min-w-0">
                                        <p className="text-sm text-gray-600">
                                            From:{" "}
                                            <span className="font-medium text-gray-900">
                                                {email.from.email}
                                            </span>
                                        </p>
                                        <h2 className="font-semibold text-gray-900 mt-1 truncate">
                                            {email.subject}
                                        </h2>
                                    </hgroup>
                                    <time
                                        dateTime={new Date(email.date).toISOString()}
                                        className="text-sm text-gray-500 flex-shrink-0 ml-4"
                                    >
                                        {new Date(email.date).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </time>
                                </header>

                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {email.short_description}
                                </p>
                            </section>
                        </article>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default EmailList;