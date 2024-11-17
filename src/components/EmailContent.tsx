import { EmailData } from "../types"
import { formatDate } from "../utils"

const EmailContent = ({ email, body }: { email: EmailData; body: string }) => {
    console.log(body)

    return <article className="prose max-w-none">
        <header className="mb-8">
            <h1 className="text-2xl font-bold mb-4">{email.subject}</h1>
            <div className="flex justify-between items-center text-gray-600 mb-6">
                <p>
                    From: <span className="font-medium">{email.from.email}</span>
                </p>
                <time
                    dateTime={new Date(email.date).toISOString()}
                    className="text-sm"
                >
                    {formatDate(email.date)}
                </time>


            </div>
        </header>

        <main>
            <p className="mb-4"> <span className=" font-semibold">Subject :</span>{email.subject}</p>

            <p>{email.short_description}</p>
        </main>

    </article>
}

export default EmailContent