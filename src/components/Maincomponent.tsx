import React from 'react'
import { useEffect } from "react"
import { useGetdata } from "../hooks"
const Maincomponent: React.FC = () => {
    const { GetThedata } = useGetdata()
    const check = () => {
        GetThedata()
    }
    useEffect(() => {
        check()
    }, [])
    return (
        <div>Maincomponent</div>
    )
}

export default Maincomponent