import { formatDate } from "@/utils";
import { Avatar } from "../components"
import { EmailData } from "../types"
const EmailListItem = ({
    email,
    isSelected,
    onClick,
    onFavoriteToggle
}: {
    email: EmailData;
    isSelected: boolean;
    onClick: () => void;
    onFavoriteToggle: (id: string) => void;
}) => {


    return <>
        <li
            onClick={onClick}
            className={`
    bg-white rounded-lg shadow-md border cursor-pointer
    transition-colors duration-200
    ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
    hover:border-blue-300
  `}
        >
            <article className="p-6 flex gap-4">
                <Avatar name={email.from.name} />

                <section className="flex-1 min-w-0">
                    <header className="flex justify-between items-center mb-2">
                        <hgroup className="min-w-0">
                            <p className="text-sm text-gray-600">
                                From: <span className="font-medium text-gray-900">{email.from.email}</span>
                            </p>
                            <h2 className="font-semibold text-gray-900 mt-1 truncate">
                                {email.subject}
                            </h2>
                        </hgroup>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onFavoriteToggle(email.id)
                            }}
                            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Mark as Favorite
                        </button>
                    </header>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {email.short_description}
                    </p>

                    <time
                        dateTime={new Date(email.date).toISOString()}
                        className="text-sm text-gray-500 flex-shrink-0"
                    >
                        {formatDate(email.date)}
                    </time>
                </section>
            </article>
        </li>



    </>
}
export default EmailListItem