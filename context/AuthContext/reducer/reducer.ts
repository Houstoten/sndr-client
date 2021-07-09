export const initialState = {
  userId: null,
  userDetails: null,
  signedIn: false,
  loading: false,
};

export const AuthReducer = (initialState: any, action: any) => {
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
        loading: false
      };
    case "LOGOUT":
      return {
        ...initialState,
        userDetails: null,
        userId: null,
        signedIn: false,
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        signedIn: false,
        errorMessage: action.error
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};