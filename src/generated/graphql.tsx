import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AuthArgs = {
  code: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  success: Scalars['Boolean'];
};


export type FileRequestArgs = {
  receiverid: Scalars['String'];
  name: Scalars['String'];
  size: Scalars['Int'];
};

export type FileRequestWithSender = {
  __typename?: 'FileRequestWithSender';
  id: Scalars['String'];
  senderid: Scalars['String'];
  receiverid: Scalars['String'];
  updatedat: Scalars['DateTime'];
  name: Scalars['String'];
  size: Scalars['Int'];
  accepted?: Maybe<Scalars['Boolean']>;
  sender?: Maybe<User>;
};

export type FileResponseArgs = {
  id: Scalars['String'];
  accepted: Scalars['Boolean'];
};

export type Filerequest = {
  __typename?: 'Filerequest';
  id: Scalars['String'];
  senderid: Scalars['String'];
  receiverid: Scalars['String'];
  updatedat: Scalars['DateTime'];
  name: Scalars['String'];
  size: Scalars['Int'];
  accepted?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  refreshTokens: AuthResponse;
  signOut: AuthResponse;
  authGoogle: AuthResponse;
  requestFileAccept: Filerequest;
  responseFileAccept: Filerequest;
  setCurrentPosition: Userposition;
};


export type MutationAuthGoogleArgs = {
  input: AuthArgs;
};


export type MutationRequestFileAcceptArgs = {
  input: FileRequestArgs;
};


export type MutationResponseFileAcceptArgs = {
  input: FileResponseArgs;
};


export type MutationSetCurrentPositionArgs = {
  input: PositionArgs;
};

export type PositionArgs = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  getUserData: User;
  getUserById: User;
  getRecentUsersRelations: Array<User>;
  getNearestUsers: Array<UserResponse>;
  getPendingFileRequests: Array<Filerequest>;
  getRecentFileRequests: Array<Filerequest>;
};


export type QueryGetUserByIdArgs = {
  input: UserByIdArgs;
};


export type QueryGetRecentFileRequestsArgs = {
  input: UserByIdArgs;
};

export type Subscription = {
  __typename?: 'Subscription';
  updateNearestData: UserUpdateResponse;
  updateUserOnline: UserOnlineResponse;
  subscribeToFileRequest: FileRequestWithSender;
  subscribeToFileResponse: Filerequest;
};


export type SubscriptionUpdateNearestDataArgs = {
  input: TrackedUsersArgs;
};

export type TrackedUsersArgs = {
  ids: Array<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  online: Scalars['Boolean'];
};

export type UserByIdArgs = {
  id: Scalars['String'];
};

export type UserOnlineResponse = {
  __typename?: 'UserOnlineResponse';
  id: Scalars['String'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  online: Scalars['Boolean'];
  distance?: Maybe<Scalars['Float']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  id: Scalars['String'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  online: Scalars['Boolean'];
  distance?: Maybe<Scalars['Float']>;
};

export type UserUpdateResponse = {
  __typename?: 'UserUpdateResponse';
  id: Scalars['String'];
  distance?: Maybe<Scalars['Float']>;
};

export type Userposition = {
  __typename?: 'Userposition';
  id: Scalars['String'];
  userid: Scalars['String'];
  updatedat: Scalars['DateTime'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type AuthGoogleMutationVariables = Exact<{
  input: AuthArgs;
}>;


export type AuthGoogleMutation = (
  { __typename?: 'Mutation' }
  & { authGoogle: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'success'>
  ) }
);

export type RefreshTokensMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokensMutation = (
  { __typename?: 'Mutation' }
  & { refreshTokens: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'success'>
  ) }
);

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = (
  { __typename?: 'Mutation' }
  & { signOut: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'success'>
  ) }
);

export type GetRecentFileRequestsQueryVariables = Exact<{
  input: UserByIdArgs;
}>;


export type GetRecentFileRequestsQuery = (
  { __typename?: 'Query' }
  & { getRecentFileRequests: Array<(
    { __typename?: 'Filerequest' }
    & Pick<Filerequest, 'id' | 'senderid' | 'receiverid' | 'name' | 'size' | 'accepted' | 'updatedat'>
  )> }
);

export type RequestFileAcceptMutationVariables = Exact<{
  input: FileRequestArgs;
}>;


export type RequestFileAcceptMutation = (
  { __typename?: 'Mutation' }
  & { requestFileAccept: (
    { __typename?: 'Filerequest' }
    & Pick<Filerequest, 'id' | 'senderid' | 'receiverid' | 'name' | 'size' | 'accepted'>
  ) }
);

export type ResponseFileAcceptMutationVariables = Exact<{
  input: FileResponseArgs;
}>;


export type ResponseFileAcceptMutation = (
  { __typename?: 'Mutation' }
  & { responseFileAccept: (
    { __typename?: 'Filerequest' }
    & Pick<Filerequest, 'id' | 'senderid' | 'receiverid' | 'name' | 'size' | 'accepted'>
  ) }
);

export type SubscribeToFileRequestSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscribeToFileRequestSubscription = (
  { __typename?: 'Subscription' }
  & { subscribeToFileRequest: (
    { __typename?: 'FileRequestWithSender' }
    & Pick<FileRequestWithSender, 'id' | 'senderid' | 'receiverid' | 'name' | 'size' | 'accepted'>
    & { sender?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'name' | 'image'>
    )> }
  ) }
);

export type SubscribeToFileResponseSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscribeToFileResponseSubscription = (
  { __typename?: 'Subscription' }
  & { subscribeToFileResponse: (
    { __typename?: 'Filerequest' }
    & Pick<Filerequest, 'id' | 'accepted'>
  ) }
);

export type GetNearestUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNearestUsersQuery = (
  { __typename?: 'Query' }
  & { getNearestUsers: Array<(
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'name' | 'image' | 'email' | 'id' | 'distance'>
  )> }
);

export type GetRecentUsersRelationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecentUsersRelationsQuery = (
  { __typename?: 'Query' }
  & { getRecentUsersRelations: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'image' | 'online'>
  )> }
);

export type GetUserByIdQueryVariables = Exact<{
  input: UserByIdArgs;
}>;


export type GetUserByIdQuery = (
  { __typename?: 'Query' }
  & { getUserById: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'image'>
  ) }
);

export type GetUserDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDataQuery = (
  { __typename?: 'Query' }
  & { getUserData: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'image'>
  ) }
);

export type UpdateNearestDataSubscriptionVariables = Exact<{
  input: TrackedUsersArgs;
}>;


export type UpdateNearestDataSubscription = (
  { __typename?: 'Subscription' }
  & { updateNearestData: (
    { __typename?: 'UserUpdateResponse' }
    & Pick<UserUpdateResponse, 'id' | 'distance'>
  ) }
);

export type UpdateUserOnlineSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UpdateUserOnlineSubscription = (
  { __typename?: 'Subscription' }
  & { updateUserOnline: (
    { __typename?: 'UserOnlineResponse' }
    & Pick<UserOnlineResponse, 'id' | 'name' | 'email' | 'image' | 'distance' | 'online'>
  ) }
);

export type SetCurrentPositionMutationVariables = Exact<{
  input: PositionArgs;
}>;


export type SetCurrentPositionMutation = (
  { __typename?: 'Mutation' }
  & { setCurrentPosition: (
    { __typename?: 'Userposition' }
    & Pick<Userposition, 'latitude' | 'longitude' | 'updatedat'>
  ) }
);


export const AuthGoogleDocument = gql`
    mutation authGoogle($input: AuthArgs!) {
  authGoogle(input: $input) {
    success
  }
}
    `;
export type AuthGoogleMutationFn = Apollo.MutationFunction<AuthGoogleMutation, AuthGoogleMutationVariables>;

/**
 * __useAuthGoogleMutation__
 *
 * To run a mutation, you first call `useAuthGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authGoogleMutation, { data, loading, error }] = useAuthGoogleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuthGoogleMutation(baseOptions?: Apollo.MutationHookOptions<AuthGoogleMutation, AuthGoogleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthGoogleMutation, AuthGoogleMutationVariables>(AuthGoogleDocument, options);
      }
export type AuthGoogleMutationHookResult = ReturnType<typeof useAuthGoogleMutation>;
export type AuthGoogleMutationResult = Apollo.MutationResult<AuthGoogleMutation>;
export type AuthGoogleMutationOptions = Apollo.BaseMutationOptions<AuthGoogleMutation, AuthGoogleMutationVariables>;
export const RefreshTokensDocument = gql`
    mutation refreshTokens {
  refreshTokens {
    success
  }
}
    `;
export type RefreshTokensMutationFn = Apollo.MutationFunction<RefreshTokensMutation, RefreshTokensMutationVariables>;

/**
 * __useRefreshTokensMutation__
 *
 * To run a mutation, you first call `useRefreshTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokensMutation, { data, loading, error }] = useRefreshTokensMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokensMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokensMutation, RefreshTokensMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokensMutation, RefreshTokensMutationVariables>(RefreshTokensDocument, options);
      }
export type RefreshTokensMutationHookResult = ReturnType<typeof useRefreshTokensMutation>;
export type RefreshTokensMutationResult = Apollo.MutationResult<RefreshTokensMutation>;
export type RefreshTokensMutationOptions = Apollo.BaseMutationOptions<RefreshTokensMutation, RefreshTokensMutationVariables>;
export const SignOutDocument = gql`
    mutation signOut {
  signOut {
    success
  }
}
    `;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const GetRecentFileRequestsDocument = gql`
    query getRecentFileRequests($input: UserByIdArgs!) {
  getRecentFileRequests(input: $input) {
    id
    senderid
    receiverid
    name
    size
    accepted
    updatedat
  }
}
    `;

/**
 * __useGetRecentFileRequestsQuery__
 *
 * To run a query within a React component, call `useGetRecentFileRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentFileRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentFileRequestsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetRecentFileRequestsQuery(baseOptions: Apollo.QueryHookOptions<GetRecentFileRequestsQuery, GetRecentFileRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecentFileRequestsQuery, GetRecentFileRequestsQueryVariables>(GetRecentFileRequestsDocument, options);
      }
export function useGetRecentFileRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecentFileRequestsQuery, GetRecentFileRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecentFileRequestsQuery, GetRecentFileRequestsQueryVariables>(GetRecentFileRequestsDocument, options);
        }
export type GetRecentFileRequestsQueryHookResult = ReturnType<typeof useGetRecentFileRequestsQuery>;
export type GetRecentFileRequestsLazyQueryHookResult = ReturnType<typeof useGetRecentFileRequestsLazyQuery>;
export type GetRecentFileRequestsQueryResult = Apollo.QueryResult<GetRecentFileRequestsQuery, GetRecentFileRequestsQueryVariables>;
export const RequestFileAcceptDocument = gql`
    mutation requestFileAccept($input: FileRequestArgs!) {
  requestFileAccept(input: $input) {
    id
    senderid
    receiverid
    name
    size
    accepted
  }
}
    `;
export type RequestFileAcceptMutationFn = Apollo.MutationFunction<RequestFileAcceptMutation, RequestFileAcceptMutationVariables>;

/**
 * __useRequestFileAcceptMutation__
 *
 * To run a mutation, you first call `useRequestFileAcceptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestFileAcceptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestFileAcceptMutation, { data, loading, error }] = useRequestFileAcceptMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestFileAcceptMutation(baseOptions?: Apollo.MutationHookOptions<RequestFileAcceptMutation, RequestFileAcceptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestFileAcceptMutation, RequestFileAcceptMutationVariables>(RequestFileAcceptDocument, options);
      }
export type RequestFileAcceptMutationHookResult = ReturnType<typeof useRequestFileAcceptMutation>;
export type RequestFileAcceptMutationResult = Apollo.MutationResult<RequestFileAcceptMutation>;
export type RequestFileAcceptMutationOptions = Apollo.BaseMutationOptions<RequestFileAcceptMutation, RequestFileAcceptMutationVariables>;
export const ResponseFileAcceptDocument = gql`
    mutation responseFileAccept($input: FileResponseArgs!) {
  responseFileAccept(input: $input) {
    id
    senderid
    receiverid
    name
    size
    accepted
  }
}
    `;
export type ResponseFileAcceptMutationFn = Apollo.MutationFunction<ResponseFileAcceptMutation, ResponseFileAcceptMutationVariables>;

/**
 * __useResponseFileAcceptMutation__
 *
 * To run a mutation, you first call `useResponseFileAcceptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResponseFileAcceptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [responseFileAcceptMutation, { data, loading, error }] = useResponseFileAcceptMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResponseFileAcceptMutation(baseOptions?: Apollo.MutationHookOptions<ResponseFileAcceptMutation, ResponseFileAcceptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResponseFileAcceptMutation, ResponseFileAcceptMutationVariables>(ResponseFileAcceptDocument, options);
      }
export type ResponseFileAcceptMutationHookResult = ReturnType<typeof useResponseFileAcceptMutation>;
export type ResponseFileAcceptMutationResult = Apollo.MutationResult<ResponseFileAcceptMutation>;
export type ResponseFileAcceptMutationOptions = Apollo.BaseMutationOptions<ResponseFileAcceptMutation, ResponseFileAcceptMutationVariables>;
export const SubscribeToFileRequestDocument = gql`
    subscription subscribeToFileRequest {
  subscribeToFileRequest {
    id
    senderid
    sender {
      name
      image
    }
    receiverid
    name
    size
    accepted
  }
}
    `;

/**
 * __useSubscribeToFileRequestSubscription__
 *
 * To run a query within a React component, call `useSubscribeToFileRequestSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToFileRequestSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeToFileRequestSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubscribeToFileRequestSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeToFileRequestSubscription, SubscribeToFileRequestSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeToFileRequestSubscription, SubscribeToFileRequestSubscriptionVariables>(SubscribeToFileRequestDocument, options);
      }
export type SubscribeToFileRequestSubscriptionHookResult = ReturnType<typeof useSubscribeToFileRequestSubscription>;
export type SubscribeToFileRequestSubscriptionResult = Apollo.SubscriptionResult<SubscribeToFileRequestSubscription>;
export const SubscribeToFileResponseDocument = gql`
    subscription subscribeToFileResponse {
  subscribeToFileResponse {
    id
    accepted
  }
}
    `;

/**
 * __useSubscribeToFileResponseSubscription__
 *
 * To run a query within a React component, call `useSubscribeToFileResponseSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToFileResponseSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeToFileResponseSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubscribeToFileResponseSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeToFileResponseSubscription, SubscribeToFileResponseSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeToFileResponseSubscription, SubscribeToFileResponseSubscriptionVariables>(SubscribeToFileResponseDocument, options);
      }
export type SubscribeToFileResponseSubscriptionHookResult = ReturnType<typeof useSubscribeToFileResponseSubscription>;
export type SubscribeToFileResponseSubscriptionResult = Apollo.SubscriptionResult<SubscribeToFileResponseSubscription>;
export const GetNearestUsersDocument = gql`
    query getNearestUsers {
  getNearestUsers {
    name
    image
    email
    id
    distance
  }
}
    `;

/**
 * __useGetNearestUsersQuery__
 *
 * To run a query within a React component, call `useGetNearestUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNearestUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNearestUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNearestUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetNearestUsersQuery, GetNearestUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNearestUsersQuery, GetNearestUsersQueryVariables>(GetNearestUsersDocument, options);
      }
export function useGetNearestUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNearestUsersQuery, GetNearestUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNearestUsersQuery, GetNearestUsersQueryVariables>(GetNearestUsersDocument, options);
        }
export type GetNearestUsersQueryHookResult = ReturnType<typeof useGetNearestUsersQuery>;
export type GetNearestUsersLazyQueryHookResult = ReturnType<typeof useGetNearestUsersLazyQuery>;
export type GetNearestUsersQueryResult = Apollo.QueryResult<GetNearestUsersQuery, GetNearestUsersQueryVariables>;
export const GetRecentUsersRelationsDocument = gql`
    query getRecentUsersRelations {
  getRecentUsersRelations {
    id
    name
    email
    image
    online
  }
}
    `;

/**
 * __useGetRecentUsersRelationsQuery__
 *
 * To run a query within a React component, call `useGetRecentUsersRelationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentUsersRelationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentUsersRelationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecentUsersRelationsQuery(baseOptions?: Apollo.QueryHookOptions<GetRecentUsersRelationsQuery, GetRecentUsersRelationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecentUsersRelationsQuery, GetRecentUsersRelationsQueryVariables>(GetRecentUsersRelationsDocument, options);
      }
export function useGetRecentUsersRelationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecentUsersRelationsQuery, GetRecentUsersRelationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecentUsersRelationsQuery, GetRecentUsersRelationsQueryVariables>(GetRecentUsersRelationsDocument, options);
        }
export type GetRecentUsersRelationsQueryHookResult = ReturnType<typeof useGetRecentUsersRelationsQuery>;
export type GetRecentUsersRelationsLazyQueryHookResult = ReturnType<typeof useGetRecentUsersRelationsLazyQuery>;
export type GetRecentUsersRelationsQueryResult = Apollo.QueryResult<GetRecentUsersRelationsQuery, GetRecentUsersRelationsQueryVariables>;
export const GetUserByIdDocument = gql`
    query getUserById($input: UserByIdArgs!) {
  getUserById(input: $input) {
    id
    name
    email
    image
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetUserDataDocument = gql`
    query getUserData {
  getUserData {
    id
    name
    email
    image
  }
}
    `;

/**
 * __useGetUserDataQuery__
 *
 * To run a query within a React component, call `useGetUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserDataQuery(baseOptions?: Apollo.QueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
      }
export function useGetUserDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
        }
export type GetUserDataQueryHookResult = ReturnType<typeof useGetUserDataQuery>;
export type GetUserDataLazyQueryHookResult = ReturnType<typeof useGetUserDataLazyQuery>;
export type GetUserDataQueryResult = Apollo.QueryResult<GetUserDataQuery, GetUserDataQueryVariables>;
export const UpdateNearestDataDocument = gql`
    subscription updateNearestData($input: TrackedUsersArgs!) {
  updateNearestData(input: $input) {
    id
    distance
  }
}
    `;

/**
 * __useUpdateNearestDataSubscription__
 *
 * To run a query within a React component, call `useUpdateNearestDataSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUpdateNearestDataSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateNearestDataSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNearestDataSubscription(baseOptions: Apollo.SubscriptionHookOptions<UpdateNearestDataSubscription, UpdateNearestDataSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UpdateNearestDataSubscription, UpdateNearestDataSubscriptionVariables>(UpdateNearestDataDocument, options);
      }
export type UpdateNearestDataSubscriptionHookResult = ReturnType<typeof useUpdateNearestDataSubscription>;
export type UpdateNearestDataSubscriptionResult = Apollo.SubscriptionResult<UpdateNearestDataSubscription>;
export const UpdateUserOnlineDocument = gql`
    subscription updateUserOnline {
  updateUserOnline {
    id
    name
    email
    image
    distance
    online
  }
}
    `;

/**
 * __useUpdateUserOnlineSubscription__
 *
 * To run a query within a React component, call `useUpdateUserOnlineSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserOnlineSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateUserOnlineSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUpdateUserOnlineSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UpdateUserOnlineSubscription, UpdateUserOnlineSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UpdateUserOnlineSubscription, UpdateUserOnlineSubscriptionVariables>(UpdateUserOnlineDocument, options);
      }
export type UpdateUserOnlineSubscriptionHookResult = ReturnType<typeof useUpdateUserOnlineSubscription>;
export type UpdateUserOnlineSubscriptionResult = Apollo.SubscriptionResult<UpdateUserOnlineSubscription>;
export const SetCurrentPositionDocument = gql`
    mutation setCurrentPosition($input: PositionArgs!) {
  setCurrentPosition(input: $input) {
    latitude
    longitude
    updatedat
  }
}
    `;
export type SetCurrentPositionMutationFn = Apollo.MutationFunction<SetCurrentPositionMutation, SetCurrentPositionMutationVariables>;

/**
 * __useSetCurrentPositionMutation__
 *
 * To run a mutation, you first call `useSetCurrentPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetCurrentPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setCurrentPositionMutation, { data, loading, error }] = useSetCurrentPositionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetCurrentPositionMutation(baseOptions?: Apollo.MutationHookOptions<SetCurrentPositionMutation, SetCurrentPositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetCurrentPositionMutation, SetCurrentPositionMutationVariables>(SetCurrentPositionDocument, options);
      }
export type SetCurrentPositionMutationHookResult = ReturnType<typeof useSetCurrentPositionMutation>;
export type SetCurrentPositionMutationResult = Apollo.MutationResult<SetCurrentPositionMutation>;
export type SetCurrentPositionMutationOptions = Apollo.BaseMutationOptions<SetCurrentPositionMutation, SetCurrentPositionMutationVariables>;