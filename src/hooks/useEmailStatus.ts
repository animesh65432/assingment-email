import { useState, useEffect } from "react";
interface EmailStatus {
    isRead: boolean;
    isFavorite: boolean;
}

interface EmailStatusMap {
    [emailId: string]: EmailStatus;
}

const useEmailStatus = () => {

    const [emailStatus, setEmailStatus] = useState<EmailStatusMap>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('emailStatus');
            return saved ? JSON.parse(saved) : {};
        }
        return {};
    });


    useEffect(() => {
        localStorage.setItem('emailStatus', JSON.stringify(emailStatus));
    }, [emailStatus]);


    const markAsRead = (emailId: string) => {
        setEmailStatus(prev => ({
            ...prev,
            [emailId]: {
                ...prev[emailId],
                isRead: true
            }
        }));
    };

    const toggleFavorite = (emailId: string) => {
        setEmailStatus(prev => ({
            ...prev,
            [emailId]: {
                ...prev[emailId],
                isFavorite: !prev[emailId]?.isFavorite
            }
        }));
    };


    const getEmailStatus = (emailId: string): EmailStatus => {
        return emailStatus[emailId] || { isRead: false, isFavorite: false };
    };

    return {
        emailStatus,
        markAsRead,
        toggleFavorite,
        getEmailStatus
    };
};

export default useEmailStatus