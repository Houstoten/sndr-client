export const initialState = {
  userId: null,
  userDetails: null,
  refreshedTokens: false,
  logoutRequested: false,
  signedIn: false,
  loading: false,
};

export const AuthReducer = (initialState: any, action: any) => {
  console.log('pinned dispatched', action);

  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        signedIn: true,
        refreshedTokens: false,
        errorMessage: null,
        loading: false
      };
    case "LOAD_USER_DATA":
      return {
        ...initialState,
        loading: true
      };
    case "LOAD_USER_DATA_SUCCESS":
      return {
        ...initialState,
        userDetails: action.payload,
        signedIn: true,
        refreshedTokens: false,
        errorMessage: null,
        loading: false
      };

    case "LOAD_USER_DATA_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.payload
      };
    case "REQUEST_LOGOUT":
      return {
        ...initialState,
        logoutRequested: true
      };
    case "LOGOUT":
      return {
        ...initialState,
        logoutRequested: false,
        userDetails: null,
        userId: null,
        signedIn: false,
        loading: false
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        signedIn: false,
        errorMessage: action.payload
      };

    case "LOGIN_ABORT":
      return {
        ...initialState,
        loading: false,
        signedIn: false,
      };
    case "UPDATE_LOADING":
      return {
        ...initialState,
        loading: action.payload.loading,
      };
    case "SET_REFRESH_TOKENS":
      return {
        ...initialState,
        refreshedTokens: action.payload.refreshedTokens
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};