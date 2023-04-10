import { createSlice } from '@reduxjs/toolkit';

export const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tagsList: [],
    tagSelected: '',
  },
  reducers: {
    updateTagsList: (state, action) => {
      state.tagsList = action.payload;
    },
    updateTagSelect: (state, action) => {
      state.tagSelected = action.payload;
    },
  },
});

export const { updateTagsList, updateTagSelect } = tagsSlice.actions;
export default tagsSlice.reducer;
