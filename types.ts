import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
};

/** Payload returned if login or signup is successful */
export type AuthPayload = {
  __typename?: 'AuthPayload';
  /** The current JWT token. Use in Authentication header */
  token?: Maybe<Scalars['String']>;
  /** The logged in user */
  user?: Maybe<User>;
};

/** Input required for Provider Join Meeting */
export type JoinMeetingInput = {
  id: Scalars['String'];
};

/** A Meeting */
export type Meeting = {
  __typename?: 'Meeting';
  completed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  reasonForVisit: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  users: Array<Maybe<User>>;
};

/** Input required for Patient Create Meeting */
export type MeetingCreateInput = {
  name: Scalars['String'];
  reasonForVisit: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Patient Initialize/ request for a meeting */
  createMeeting?: Maybe<Meeting>;
  /** Patient Initialize/ request for a meeting */
  joinMeeting?: Maybe<Meeting>;
  /** Login to an existing account */
  login?: Maybe<AuthPayload>;
  /** Signup for an account */
  signup?: Maybe<AuthPayload>;
};

export type MutationCreateMeetingArgs = {
  data: MeetingCreateInput;
};

export type MutationJoinMeetingArgs = {
  data: JoinMeetingInput;
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationSignupArgs = {
  data: SignupInput;
};

/** A User Profile */
export type Profile = {
  __typename?: 'Profile';
  createdAt: Scalars['DateTime'];
  firstName: Scalars['String'];
  /** The first and last name of a user */
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  /** Returns active meetings */
  activeMeeting?: Maybe<Meeting>;
  /** Returns the currently logged in user */
  me?: Maybe<User>;
  /** Returns available meetings */
  meetings?: Maybe<Array<Maybe<Meeting>>>;
  /** Returns the twilio auth token for user */
  twilioToken?: Maybe<TwilioAuthToken>;
};

export type QueryTwilioTokenArgs = {
  meetingId: Scalars['String'];
};

/** Input required for a user to signup */
export type SignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  profile: SignupProfileInput;
};

/** Input required for Profile Create on Signup. */
export type SignupProfileCreateInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

/** Input required for Profile on Signup. */
export type SignupProfileInput = {
  create: SignupProfileCreateInput;
};

/** Sort direction for filtering queries (ascending or descending) */
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

/** A way to filter string fields. Meant to pass to prisma where clause */
export type StringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

/** Payload returned if query twilio token is successful */
export type TwilioAuthToken = {
  __typename?: 'TwilioAuthToken';
  /** The current Twilio JWT token */
  token?: Maybe<Scalars['String']>;
};

/** A User */
export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  profile?: Maybe<Profile>;
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

/** Order users by a specific field */
export type UserOrderByInput = {
  createdAt?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

/** Input to find users based other fields */
export type UserWhereInput = {
  email?: Maybe<StringFilter>;
  id?: Maybe<Scalars['Int']>;
};

/** Input to find users based on unique fields */
export type UserWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login?: Maybe<
    { __typename?: 'AuthPayload' } & Pick<AuthPayload, 'token'> & {
        user?: Maybe<{ __typename?: 'User' } & Pick<User, 'role'>>;
      }
  >;
};

export type SignupMutationVariables = Exact<{
  data: SignupInput;
}>;

export type SignupMutation = { __typename?: 'Mutation' } & {
  signup?: Maybe<
    { __typename?: 'AuthPayload' } & Pick<AuthPayload, 'token'> & {
        user?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'role'>>;
      }
  >;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'email' | 'role'>>;
};

export type JoinMeetingMutationVariables = Exact<{
  data: JoinMeetingInput;
}>;

export type JoinMeetingMutation = { __typename?: 'Mutation' } & {
  joinMeeting?: Maybe<{ __typename?: 'Meeting' } & Pick<Meeting, 'id' | 'name' | 'reasonForVisit'>>;
};

export type MeetingsQueryVariables = Exact<{ [key: string]: never }>;

export type MeetingsQuery = { __typename?: 'Query' } & {
  meetings?: Maybe<
    Array<
      Maybe<
        { __typename?: 'Meeting' } & Pick<Meeting, 'id' | 'name' | 'reasonForVisit'> & {
            users: Array<Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>>;
          }
      >
    >
  >;
};

export type CreateMeetingMutationVariables = Exact<{
  data: MeetingCreateInput;
}>;

export type CreateMeetingMutation = { __typename?: 'Mutation' } & {
  createMeeting?: Maybe<
    { __typename?: 'Meeting' } & Pick<Meeting, 'id' | 'name' | 'reasonForVisit'>
  >;
};

export type ActiveMeetingQueryVariables = Exact<{ [key: string]: never }>;

export type ActiveMeetingQuery = { __typename?: 'Query' } & {
  activeMeeting?: Maybe<{ __typename?: 'Meeting' } & Pick<Meeting, 'id'>>;
};

export type TwilioTokenQueryVariables = Exact<{
  meetingId: Scalars['String'];
}>;

export type TwilioTokenQuery = { __typename?: 'Query' } & {
  twilioToken?: Maybe<{ __typename?: 'TwilioAuthToken' } & Pick<TwilioAuthToken, 'token'>>;
};

export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        role
      }
    }
  }
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}

export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const SignupDocument = gql`
  mutation signup($data: SignupInput!) {
    signup(data: $data) {
      token
      user {
        id
        role
      }
    }
  }
`;
export type SignupMutationFn = ApolloReactCommon.MutationFunction<
  SignupMutation,
  SignupMutationVariables
>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SignupMutation, SignupMutationVariables>
) {
  return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    baseOptions
  );
}

export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = ApolloReactCommon.MutationResult<SignupMutation>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
export const MeDocument = gql`
  query me {
    me {
      id
      email
      role
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}

export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}

export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const JoinMeetingDocument = gql`
  mutation joinMeeting($data: JoinMeetingInput!) {
    joinMeeting(data: $data) {
      id
      name
      reasonForVisit
    }
  }
`;
export type JoinMeetingMutationFn = ApolloReactCommon.MutationFunction<
  JoinMeetingMutation,
  JoinMeetingMutationVariables
>;

/**
 * __useJoinMeetingMutation__
 *
 * To run a mutation, you first call `useJoinMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinMeetingMutation, { data, loading, error }] = useJoinMeetingMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useJoinMeetingMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    JoinMeetingMutation,
    JoinMeetingMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<JoinMeetingMutation, JoinMeetingMutationVariables>(
    JoinMeetingDocument,
    baseOptions
  );
}

export type JoinMeetingMutationHookResult = ReturnType<typeof useJoinMeetingMutation>;
export type JoinMeetingMutationResult = ApolloReactCommon.MutationResult<JoinMeetingMutation>;
export type JoinMeetingMutationOptions = ApolloReactCommon.BaseMutationOptions<
  JoinMeetingMutation,
  JoinMeetingMutationVariables
>;
export const MeetingsDocument = gql`
  query meetings {
    meetings {
      id
      name
      reasonForVisit
      users {
        id
      }
    }
  }
`;

/**
 * __useMeetingsQuery__
 *
 * To run a query within a React component, call `useMeetingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeetingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeetingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeetingsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MeetingsQuery, MeetingsQueryVariables>
) {
  return ApolloReactHooks.useQuery<MeetingsQuery, MeetingsQueryVariables>(
    MeetingsDocument,
    baseOptions
  );
}

export function useMeetingsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeetingsQuery, MeetingsQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<MeetingsQuery, MeetingsQueryVariables>(
    MeetingsDocument,
    baseOptions
  );
}

export type MeetingsQueryHookResult = ReturnType<typeof useMeetingsQuery>;
export type MeetingsLazyQueryHookResult = ReturnType<typeof useMeetingsLazyQuery>;
export type MeetingsQueryResult = ApolloReactCommon.QueryResult<
  MeetingsQuery,
  MeetingsQueryVariables
>;
export const CreateMeetingDocument = gql`
  mutation createMeeting($data: MeetingCreateInput!) {
    createMeeting(data: $data) {
      id
      name
      reasonForVisit
    }
  }
`;
export type CreateMeetingMutationFn = ApolloReactCommon.MutationFunction<
  CreateMeetingMutation,
  CreateMeetingMutationVariables
>;

/**
 * __useCreateMeetingMutation__
 *
 * To run a mutation, you first call `useCreateMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMeetingMutation, { data, loading, error }] = useCreateMeetingMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMeetingMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateMeetingMutation,
    CreateMeetingMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<CreateMeetingMutation, CreateMeetingMutationVariables>(
    CreateMeetingDocument,
    baseOptions
  );
}

export type CreateMeetingMutationHookResult = ReturnType<typeof useCreateMeetingMutation>;
export type CreateMeetingMutationResult = ApolloReactCommon.MutationResult<CreateMeetingMutation>;
export type CreateMeetingMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateMeetingMutation,
  CreateMeetingMutationVariables
>;
export const ActiveMeetingDocument = gql`
  query activeMeeting {
    activeMeeting {
      id
    }
  }
`;

/**
 * __useActiveMeetingQuery__
 *
 * To run a query within a React component, call `useActiveMeetingQuery` and pass it any options that fit your needs.
 * When your component renders, `useActiveMeetingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActiveMeetingQuery({
 *   variables: {
 *   },
 * });
 */
export function useActiveMeetingQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<ActiveMeetingQuery, ActiveMeetingQueryVariables>
) {
  return ApolloReactHooks.useQuery<ActiveMeetingQuery, ActiveMeetingQueryVariables>(
    ActiveMeetingDocument,
    baseOptions
  );
}

export function useActiveMeetingLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ActiveMeetingQuery,
    ActiveMeetingQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<ActiveMeetingQuery, ActiveMeetingQueryVariables>(
    ActiveMeetingDocument,
    baseOptions
  );
}

export type ActiveMeetingQueryHookResult = ReturnType<typeof useActiveMeetingQuery>;
export type ActiveMeetingLazyQueryHookResult = ReturnType<typeof useActiveMeetingLazyQuery>;
export type ActiveMeetingQueryResult = ApolloReactCommon.QueryResult<
  ActiveMeetingQuery,
  ActiveMeetingQueryVariables
>;
export const TwilioTokenDocument = gql`
  query twilioToken($meetingId: String!) {
    twilioToken(meetingId: $meetingId) {
      token
    }
  }
`;

/**
 * __useTwilioTokenQuery__
 *
 * To run a query within a React component, call `useTwilioTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useTwilioTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTwilioTokenQuery({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useTwilioTokenQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<TwilioTokenQuery, TwilioTokenQueryVariables>
) {
  return ApolloReactHooks.useQuery<TwilioTokenQuery, TwilioTokenQueryVariables>(
    TwilioTokenDocument,
    baseOptions
  );
}

export function useTwilioTokenLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TwilioTokenQuery, TwilioTokenQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<TwilioTokenQuery, TwilioTokenQueryVariables>(
    TwilioTokenDocument,
    baseOptions
  );
}

export type TwilioTokenQueryHookResult = ReturnType<typeof useTwilioTokenQuery>;
export type TwilioTokenLazyQueryHookResult = ReturnType<typeof useTwilioTokenLazyQuery>;
export type TwilioTokenQueryResult = ApolloReactCommon.QueryResult<
  TwilioTokenQuery,
  TwilioTokenQueryVariables
>;
