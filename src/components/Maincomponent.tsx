import React from 'react'
import { useEffect } from "react"
import { useGetdata } from "../hooks"
import { addEmail } from "../store/Slices/EmailSlices"
import { useDispatch } from 'react-redux'
import { EmailViewer, Navbar } from "./index"
import { useSelector } from "react-redux"
import { RootStore } from "../store"
const Maincomponent: React.FC = () => {
    const { getData } = useGetdata()
    const dispatch = useDispatch()
    const email = useSelector((state: RootStore) => state.Email.Email)
    const check = async () => {
        try {
            if (email.length === 0) {
                const data = await getData("/api")
                dispatch(addEmail(data))
            }
            else {
                return
            }
        } catch {
            dispatch(addEmail([]))
        }
    }
    useEffect(() => {
        check()
    }, [check])
    return (
        <main>

            <Navbar />
            <EmailViewer />
        </main>

    )
}

export default Maincomponent