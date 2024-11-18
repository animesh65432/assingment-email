export const formatDate = (date: number) => {

    return new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};


export const fetchEmailBody = async (emailId: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `This is the full body content for email ${emailId}...`;
};
