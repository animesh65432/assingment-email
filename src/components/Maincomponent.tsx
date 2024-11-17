import React from 'react'
import { useEffect } from "react"
import { useGetdata } from "../hooks"
import { addEmail } from "../store/Slices/EmailSlices"
import { useDispatch } from 'react-redux'
import { Email } from "./index"
const Maincomponent: React.FC = () => {
    const { getData } = useGetdata()
    const dispatch = useDispatch()
    const check = async () => {
        try {
            let data = await getData("/api")
            dispatch(addEmail(data))
        } catch (error) {
            dispatch(addEmail([]))
        }
    }
    useEffect(() => {
        check()
    }, [])
    return (
        <main>
            <Email />
        </main>

    )
}

export default Maincomponent