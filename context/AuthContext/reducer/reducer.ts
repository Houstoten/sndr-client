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
        errorMessage: null,
        loading: false
      };

    case "LOAD_USER_DATA_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.payload
      };

    case "LOGOUT":      
      return {
        ...initialState,
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
  
  

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};