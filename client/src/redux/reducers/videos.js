const initialState = {
  trending: [],
  recommended: [],
  isLoading: false,
};

const videosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TRENDING":
    case "SET_RECOMMENDED":
    case "SET_LOADING":
    case "SET_RECOMMENDED":
      return { ...state, ...action.payload };
    case "REST_VIDEOS":
      return { ...initialState };
    default:
      return state;
  }
};
export default videosReducer;
