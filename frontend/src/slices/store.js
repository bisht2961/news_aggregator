import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegun } from "../../store/api_calls";

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    list: [],
    loading: false,
    user: null,
    error: null,
    token: null,
    server: null,
    item: null,
    page: 1,
    hasMore: true
  },
  reducers: {
    signInOrLoginRequest: (state, action) => {
      state.user = action.user
      state.loading = true;
      state.error = null
    },
    signUpReceived: (state, action) => {
      state.user = action.user
      state.loading = false;
    },
    loginReceived: (state, action) => { 
      state.token = action.payload;
      state.loading = false;
    },
    tokenRefreshed: (state,action)=>{
      state.token = action.payload,
      state.loading = false;
    },
    userRequestFailed: (state, action) => {
      state.loading = false;
      state.user = null
      state.error = action.payload
    },
    newsRequested: (state, action) => {
      state.loading = true;
      state.error = null
    },
    newsReceived: (state, action) => {
      state.list = [...state.list, ...action.payload.articles];
      state.hasMore = action.payload.totalResults > state.list.length; 
      state.page += 1;
      state.loading = false;
    },
    resetNews: (state) => {
      state.list = [];
      state.page = 1;
      state.hasMore = false;
    },
    newsRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload
    },
    newsScrapRequested: (state, action) => {
      state.loading = true;
      state.error = null
      state.item = action.payload.item
    },
    newsScrapReceived: (state, action) => {
      state.item = action.payload;
      state.loading = false;
      state.error = null
    },
    newsScrapRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload
    },
    summaryRequested: (state, action) => {
      state.loading = true;
      state.error = null
    },
    summaryReceived: (state, action) => {
      state.item.content = action.payload.summary;
      state.loading = false;
    },
    summaryFailed: (state, action) => { 
      state.loading = false;
      state.error = action.payload
    }
  },
});

export const {
  newsRequested,
  newsReceived,
  newsRequestFailed,
  userRequest,
  signUpReceived,
  loginReceived,
  userRequestFailed,
  signInOrLoginRequest,
  tokenRefreshed,
  newsScrapRequested,
  newsScrapReceived,
  newsScrapRequestFailed,
  summaryRequested,
  summaryReceived,
  summaryFailed,
  resetNews
} = newsSlice.actions;

export default newsSlice.reducer;


export const loadEveryNews = (data) => (dispatch) => {
  const url = `news/everything?page=${data.page}&page_size=${data.page_size}&news_preference=${data.news_preference}`
  return dispatch(
    apiCallBegun({
      url,
      data: data,
      method: "GET",
      onStart: newsRequested.type,
      onSuccess: newsReceived.type,
      onFailure: newsRequestFailed.type,
      tokenRefreshed: tokenRefreshed.type
    })
  );
};

export const loadCategoryNews = (data) => (dispatch) => {
  const url = `news/category?page=${data.page}&pageSize=${data.pageSize}&newsPreferences=${data.newsPreferences[0]}`
  return dispatch(
    apiCallBegun({
      url,
      token: data.token,
      data: data,
      method: "GET",
      onStart: newsRequested.type,
      onSuccess: newsReceived.type,
      onFailure: newsRequestFailed.type,
      tokenRefreshed: tokenRefreshed.type
    })
  );
};
export const registerUser = (user) => (dispatch) => {
  const url = "user/register";
  return dispatch(
    apiCallBegun({
      url,
      data: user,
      method:"POST",
      onStart: signInOrLoginRequest.type,
      onSuccess: signUpReceived.type,
      onFailure: userRequestFailed.type,
    })
  );
};

export const loginUser = (user) => (dispatch) => {
  const url = "user/login";
  return dispatch(
    apiCallBegun({
      url,
      data:user,
      method:"POST",
      onStart: signInOrLoginRequest.type,
      onSuccess: loginReceived.type,
      onFailure: userRequestFailed.type,
    })
  );
};

export const fetchNewsContent = (data) => (dispatch) => {
  const url = "news/scrap";
  return dispatch(
    apiCallBegun({
      url,
      token: data.token,
      data: data.item,
      method: "POST",
      onStart: newsScrapRequested.type,
      onSuccess: newsScrapReceived.type,
      onFailure: newsScrapRequestFailed.type,
    })
  );
}

export const generateSummary = (data) => (dispatch) => {  
  const url = "summarize/article";
  return dispatch(
    apiCallBegun({
      url,
      data: data.item,
      method: "POST",
      onStart: summaryRequested.type,
      onSuccess: summaryReceived.type,
      onFailure: summaryFailed.type,
    })
  );
}