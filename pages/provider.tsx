import React from 'react';
import Head from 'next/head';
import { Heading } from '@chakra-ui/react';

import { Provider } from '../components/VideoChat/Provider';

function ProviderPage() {
  return (
    <>
      <Head>
        <title>ProviderPage</title>
      </Head>

      <Heading size="lg">I am provider page</Heading>
      <Provider />
    </>
  );
}

export default ProviderPage;
