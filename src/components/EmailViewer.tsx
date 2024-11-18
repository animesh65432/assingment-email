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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const { getEmailStatus, markAsRead, toggleFavorite } = useEmailStatus();


    const enhancedEmails = useMemo(() =>
        emails.map(email => ({
            ...email,
            ...getEmailStatus(email.id),
        })),
        [emails, getEmailStatus]
    );

    const totalPages = Math.ceil(filterarray.length / itemsPerPage);


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

    const paginatedEmails = filterarray.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <main className="grid grid-cols-12 ">
            <div className="col-span-7">
                <EmailList
                    emails={paginatedEmails}
                    selectedId={selectedEmailId}
                    onEmailSelect={handleEmailSelect}
                    onFavoriteToggle={handleFavoriteToggle}
                />
                <div className="flex justify-center items-center mt-4">
                    <button
                        className="px-4 py-2 mx-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="px-4">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="px-4 py-2 mx-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
            <div className="col-span-5">
                <EmailBody
                    selectedEmail={selectedEmail}
                    isLoading={isLoading}
                    emailBody={emailBody}
                />
            </div>
        </main>

    );
};

export default EmailViewer;
