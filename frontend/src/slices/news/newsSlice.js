import { createSlice } from '@reduxjs/toolkit';

const initialNewsState = {
  articles: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1
};

const newsSlice = createSlice({
  name: 'news',
  initialState: initialNewsState,
  reducers: {
    fetchNewsStart: (state,action) => {
      state.loading = true;
      state.error = null;
      state.currentPage = action.payload.page;
    },
    fetchNewsSuccess: (state, action) => {
      state.loading = false;
      state.articles = action.payload.articles;
      state.totalPages = action.payload.totalPages;
    },
    fetchNewsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetNews: (state) => {
      return initialNewsState;
    },
    fetchNewsScrapStarted: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchNewsScrapSuccess: (state, action) => {
      state.loading = false;
      state.articles = action.payload.articles;
    },
    fetchNewsScrapFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error; 
    }
  }
});

export const {
  fetchNewsStart,
  fetchNewsSuccess,
  fetchNewsFailure,
  resetNews,
  fetchNewsScrapStarted,
  fetchNewsScrapSuccess,
  fetchNewsScrapFailure
} = newsSlice.actions;

export default newsSlice.reducer;