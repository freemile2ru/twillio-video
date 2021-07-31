import React from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';

import { AuthProvider } from '../context/auth';
import { TwilioProvider } from '../context/twilio';
import { createApolloClient } from '../lib/apolloClient';
import defaultTheme from '../chakra';

const defaultApolloClient = createApolloClient();

/**
 * Renders all context providers
 */
export function AllProviders({
  apolloClient = defaultApolloClient,
  theme = defaultTheme,
  children,
}) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <TwilioProvider>
            <CSSReset />

            {children}
          </TwilioProvider>
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}
