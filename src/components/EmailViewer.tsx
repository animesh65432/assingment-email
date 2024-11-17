
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { fetchEmailBody } from "../utils"
import { EmailBody, EmailList } from ".";
import { RootStore } from "../types"
import { useEmailStatus } from "../hooks"

interface EmailStatus {
    isRead: boolean;
    isFavorite: boolean;
}

interface EmailStatusMap {
    [emailId: string]: EmailStatus;
}


const EmailViewer: React.FC = () => {
    const emails = useSelector((state: RootStore) => state.Email.Email);
    const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
    const [emailBody, setEmailBody] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const { getEmailStatus, markAsRead, toggleFavorite, emailStatus } = useEmailStatus()
    const [activeFilter, setActiveFilter] = useState<string>('all');

    const enhancedEmails = emails.map(email => ({
        ...email,
        ...getEmailStatus(email.id)
    }));
    const handleEmailSelect = async (emailId: string) => {
        setSelectedEmailId(emailId);
        setIsLoading(true);
        try {
            const body = await fetchEmailBody(emailId);
            setEmailBody(body);
            markAsRead(emailId)
        } catch (error) {
            console.error("Failed to fetch email body:", error);
            setEmailBody("Failed to load email content.");
        } finally {
            setIsLoading(false);
        }
    };

    const filteredEmails = enhancedEmails.filter(email => {
        switch (activeFilter) {
            case 'unread':
                return !email.isRead;
            case 'read':
                return email.isRead;
            case 'favorite':
                return email.isFavorite;
            default:
                return true;
        }
    });

    const handleFavoriteToggle = (emailId: string) => {
        console.log(emailId)
        toggleFavorite(emailId);
    };



    const selectedEmail = enhancedEmails.find(email => email.id === selectedEmailId);

    return (
        <main className="flex h-screen bg-gray-100">
            <EmailList
                emails={emails}
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