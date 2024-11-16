import { NextResponse, NextRequest } from "next/server"
import axios from "axios"
export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const page = searchParams.get("page")
        console.log(page)
        const reponse = await axios.get(`${process.env.BACKEND_URL}/?page=1`)
        console.log(reponse?.data)
        return NextResponse.json({
            message: "Hello World",
            data: reponse?.data
        }, {
            status: 200
        })
    } catch (error) {

        return NextResponse.json({
            message: "internal server error"
        }, {
            status: 500
        })
    }
}