import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { fetchEmailBody } from "../utils";
import { EmailBody, EmailList } from ".";
import { useEmailStatus } from "../hooks";
import { RootStore } from "../store";
import { EmailData } from "../types";

const EmailViewer: React.FC = () => {
    const emails = useSelector((state: RootStore) => state.Email.Email);
    const activeFilter = useSelector((state: RootStore) => state.Filter.filtertypes);

    const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
    const [emailBody, setEmailBody] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [filterarray, setfilterarray] = useState<EmailData[]>([]);

    const { getEmailStatus, markAsRead, toggleFavorite } = useEmailStatus();


    const enhancedEmails = useMemo(() =>
        emails.map(email => ({
            ...email,
            ...getEmailStatus(email.id),
        })),
        [emails, getEmailStatus]
    );


    const filteralltheemails = useCallback(() => {
        let filteredEmails = enhancedEmails;

        if (activeFilter === "Unread") {
            filteredEmails = enhancedEmails.filter(email => !email.isRead);
        } else if (activeFilter === "Read") {
            filteredEmails = enhancedEmails.filter(email => email.isRead);
        } else if (activeFilter === "Favorites") {
            filteredEmails = enhancedEmails.filter(email => email.isFavorite);
        }

        if (JSON.stringify(filteredEmails) !== JSON.stringify(filterarray)) {
            setfilterarray(filteredEmails);
        }
    }, [activeFilter, enhancedEmails, filterarray]);


    useEffect(() => {
        filteralltheemails();
    }, [filteralltheemails]);

    const handleEmailSelect = async (emailId: string) => {
        setSelectedEmailId(emailId);
        setIsLoading(true);
        try {
            const body = await fetchEmailBody(emailId);
            setEmailBody(body);
            markAsRead(emailId);
        } catch (error) {
            console.error("Failed to fetch email body:", error);
            setEmailBody("Failed to load email content.");
        } finally {
            setIsLoading(false);
        }
    };

    console.log(filterarray)

    const handleFavoriteToggle = (emailId: string) => {
        toggleFavorite(emailId);
    };

    const selectedEmail = enhancedEmails.find(email => email.id === selectedEmailId);

    return (
        <main className="flex h-screen bg-gray-100">
            <EmailList
                emails={filterarray}
                selectedId={selectedEmailId}
                onEmailSelect={handleEmailSelect}
                onFavoriteToggle={handleFavoriteToggle}
            />
            <EmailBody
                selectedEmail={selectedEmail}
                isLoading={isLoading}
                emailBody={emailBody}
            />
        </main>
    );
};

export default EmailViewer;
