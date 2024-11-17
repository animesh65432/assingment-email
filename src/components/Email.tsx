import React from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../store";

const Email: React.FC = () => {
    const emails = useSelector((state: RootStore) => state.Email.Email);

    return (
        <section>
            <header>
                <h1>Email List</h1>
            </header>
            <ul>
                {emails.map((email) => (
                    <li key={email.id}>
                        <article>
                            <header>
                                <p>From: {email.from.email}</p>
                                <h2>{email.subject}</h2>
                                <time dateTime={new Date(email.date).toISOString()}>
                                    {new Date(email.date).toLocaleString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </time>
                            </header>
                            <p>{email.short_description}</p>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Email;
