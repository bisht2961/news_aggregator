import {
  fetchNewsStart,
  fetchNewsSuccess,
  fetchNewsFailure,
  fetchNewsScrapStarted,
  fetchNewsScrapSuccess,
  fetchNewsScrapFailure
} from "../../slices/news/newsSlice";
import mainApi from "../middleware/mainApi";
import summaryApi from "../middleware/summaryApi";


// Fetch all news action
export const loadEveryNews = (data) => async(dispatch) => {
  try {
  
    const { page, page_size, news_preference } = data;
    dispatch(fetchNewsStart(page=page));
    console.log(mainApi);
    const url = `news/everything?page=${page}&page_size=${page_size}&news_preference=${news_preference}`
    const response = await mainApi.get(url);
        
    const { articles, totalPages } = response.data;
    console.log(response.data);
    dispatch(
      fetchNewsSuccess({
        articles,
        totalPages,
      })
    );
    return { success: true };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch news";
    dispatch(fetchNewsFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};

// Fetch news action creator
export const fetchNewsByCategory =
  (page = 1, page_size = 10, news_preference = "general") =>
  async (dispatch) => {
    try {
      dispatch(fetchNewsStart());
      const url = `news/category?page=${page}&pageSize=${page_size}&newsPreferences=${news_preference}`
      const response = await mainApi.get(url);
      const { articles, currentPage, totalPages } = response.data;
      console.log(response.data);
      dispatch(
        fetchNewsSuccess({
          articles,
          totalPages,
        })
      );

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch news";
      dispatch(fetchNewsFailure(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

// Fetch news content 
export const fetchNewsContent = (data) => async(dispatch) => {
  const url = "news/scrap";
  try {
    dispatch(fetchNewsScrapStarted());
    const response = await mainApi.post(url, data);
    dispatch(fetchNewsScrapSuccess(response.data));
    return { success: true };
  } catch (error) {
    dispatch(fetchNewsScrapFailure(error.message));
    return { success: false, error: error.message };
  }
}


// Fetch news summary from Python backend
export const fetchNewsSummary = (newsData) => async (dispatch) => {
  try {
    const response = await summaryApi.get(`/summary/`);
    dispatch(
      updateNewsSummary({
        newsData,
        summary: response.data.summary,
      })
    );
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
