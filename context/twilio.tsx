import React, { createContext, useContext, ReactNode } from 'react';
import { gql } from '@apollo/client';

import { User, useTwilioTokenLazyQuery } from '../types';

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
  const [loadTwilioToken, { data, loading }] = useTwilioTokenLazyQuery();
  const token = data?.twilioToken?.token;
  // Load current token if there's an item in local storage

  async function setToken(meetingId) {
    await loadTwilioToken({ variables: { meetingId } });
  }

  const value = { token, loading, setToken };
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
  loading?: boolean;
  setToken?: (token: string) => any;
}
