import { createSlice } from '@reduxjs/toolkit';

export const searchBoxSlice = createSlice({
  name: 'searchBox',
  initialState: {
    searchText: '',
    reSearch: false,
  },
  reducers: {
    updateSearchBox: (state, action) => {
      state.searchText = action.payload;
    },
    updateResearch: (state, action) => {
      state.reSearch = action.payload;
    },
  },
});

export const { updateSearchBox, updateResearch } = searchBoxSlice.actions;
export default searchBoxSlice.reducer;
