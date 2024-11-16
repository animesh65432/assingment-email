import axios from 'axios'
import { useState } from 'react'

const useGetdata = () => {
    const [loading, setloaindg] = useState<boolean>(false)

    const GetThedata = async () => {
        setloaindg(true)
        try {
            let response = await axios.get("/api/?page=1")
            console.log(response?.data)
        } catch (error) {
            console.log(error)
        }
        finally {
            setloaindg(false)
        }
    }

    return { loading, GetThedata }
}

export default useGetdata