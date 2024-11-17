import React from "react";

type Props = {
    name: string
}

const Avatar: React.FC<Props> = ({ name }: { name: string }) => (

    <aside className="flex-shrink-0">
        <figure className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center">
            <figcaption className="text-lg font-semibold text-white">
                {name[0]}
            </figcaption>
        </figure>
    </aside>
);


export default Avatar