import { NextResponse } from "next/server"
import axios from "axios"
export const GET = async () => {
    try {
        const reponse = await axios.get(`https://flipkart-email-mock.vercel.app`)
        console.log(reponse, "Response From Backend")
        console.log(reponse?.data)
        return NextResponse.json({
            message: "Hello World",
            data: reponse?.data
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: error
        }, {
            status: 500
        })
    }
}