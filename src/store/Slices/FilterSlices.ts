import { createSlice } from "@reduxjs/toolkit"


const FilterSlices = createSlice({
    name: "Filter",
    initialState: {
        filtertypes: "all"
    },
    reducers: {
        onchaengeFilter: (state, action) => {
            state.filtertypes = action.payload
        }
    }
})

export const { onchaengeFilter } = FilterSlices.actions

export default FilterSlices.reducer