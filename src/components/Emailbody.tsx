import { LoadingSpinner, EmailContent } from "./index"
import { EmailData } from "../types"

const EmailBody = ({
    selectedEmail,
    isLoading,
    emailBody
}: {
    selectedEmail: EmailData | undefined;
    isLoading: boolean;
    emailBody: string;
}) => (
    <section className="w-1/2 p-4 bg-white overflow-y-auto">
        {selectedEmail ? (
            isLoading ? (
                <LoadingSpinner />
            ) : (
                <EmailContent email={selectedEmail} body={emailBody} />
            )
        ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
                Select an email to view its contents
            </div>
        )}
    </section>
);

export default EmailBody