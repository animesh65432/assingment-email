import React from 'react'
import { Provider } from "react-redux"
import Stroe from '@/store'

type Props = {
    children: React.ReactNode
}

const ReactProvider: React.FC<Props> = ({ children }) => {
    return (
        <Provider store={Stroe}>
            {children}
        </Provider>
    )
}

export default ReactProvider