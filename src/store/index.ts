import { configureStore } from "@reduxjs/toolkit"
import { Emailreducer, FilterReducer } from "./Slices"

const Stroe = configureStore({
    reducer: {
        Email: Emailreducer,
        Filter: FilterReducer
    }
})

export type RootStore = ReturnType<typeof Stroe.getState>
export default Stroe 