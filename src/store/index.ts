import { configureStore } from "@reduxjs/toolkit"
import { EmailSlices } from "./Slices"

const Stroe = configureStore({
    reducer: {
        Email: EmailSlices
    }
})

export type RootStore = ReturnType<typeof Stroe.getState>
export default Stroe