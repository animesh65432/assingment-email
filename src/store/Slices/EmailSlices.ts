import { createSlice } from "@reduxjs/toolkit"


interface EmailSender {
    email: string;
    name: string;
}

interface EmailData {
    id: string;
    from: EmailSender;
    date: number;
    subject: string;
    short_description: string;
}

interface EmailSliceTypes {
    Email: EmailData[]
}

const EmailSlices = createSlice({
    name: "Email",
    initialState: {
        Email: []
    } as EmailSliceTypes,
    reducers: {
        addEmail: (state, action) => {
            state.Email = action.payload
        },

    }
})

export const { addEmail } = EmailSlices.actions

export default EmailSlices.reducer