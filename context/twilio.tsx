import React, { createContext, useContext, ReactNode } from 'react';
import { gql } from '@apollo/client';

import { cookies } from '../lib/cookies';
import { User, useTwilioTokenLazyQuery } from '../types';
import { FullPageSpinner } from '../components/FullPageSpinner';
import { TWILIO_TOKEN_KEY } from '../constants';

const now = new Date();
const timeValidInMs = 365 * 24 * 60 * 60 * 1000;
const COOKIE_EXPIRE_DATE = new Date(now.getTime() + timeValidInMs);

const TwilioContext = createContext<TwilioContextObject>({});
TwilioContext.displayName = 'TwilioContext';

export const TWILIO_TOKEN_QUERY = gql`
  query twilioToken($meetingId: String!) {
    twilioToken(meetingId: $meetingId) {
      token
    }
  }
`;

function TwilioProvider({ ...props }: Props) {
  const [loadTwilioToken, { called, data, loading, refetch }] = useTwilioTokenLazyQuery();
  const token = data?.twilioToken?.token;
  // Load current token if there's an item in local storage

  if (loading) {
    return <FullPageSpinner />;
  }

  /**
   * Logs in a token by setting an twilio token in a cookie. We use cookies so they are available in SSR.
   * @param token the token to login with
   */
  function setToken(token) {
    cookies().set(TWILIO_TOKEN_KEY, token, { path: '/', expires: COOKIE_EXPIRE_DATE });

    const fetchTwilioTokenData = called ? refetch : loadTwilioToken;
    return fetchTwilioTokenData();
  }

  const value = { token, setToken };
  return <TwilioContext.Provider value={value} {...props} />;
}

const useTwilio = () => useContext(TwilioContext);
export { TwilioProvider, useTwilio };

interface Props {
  loggedInUser?: Partial<User>;
  children: ReactNode;
}

export interface TwilioContextObject {
  token?: string;
  setToken?: (token: string) => any;
}
