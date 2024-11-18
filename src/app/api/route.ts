import { NextResponse } from "next/server"
import axios from "axios"
export const GET = async () => {
    try {
        const reponse = await axios.get(`${process.env.BACKEND_URL}`)
        console.log(reponse, "Response From Backend")
        console.log(reponse?.data)
        return NextResponse.json({
            message: "Hello World",
            data: reponse?.data
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "internal server error"
        }, {
            status: 500
        })
    }
}