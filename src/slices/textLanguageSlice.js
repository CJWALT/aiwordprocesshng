import { createSlice } from '@reduxjs/toolkit';

const textLanguageSlice = createSlice({
  name: 'language',
  initialState: { detected: '', selected: 'en' },
  reducers: {
    setDetectedLanguage: (state, action) => {
      state.detected = action.payload;
    },
    setSelectedLanguage: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { setDetectedLanguage, setSelectedLanguage } = textLanguageSlice.actions;
export default textLanguageSlice.reducer;