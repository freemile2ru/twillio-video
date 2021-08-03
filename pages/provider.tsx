import React from 'react';
import Head from 'next/head';
import { Heading, Center, Flex } from '@chakra-ui/react';

import { Provider } from '../components/Provider';

function ProviderPage() {
  return (
    <>
      <Head>
        <title>ProviderPage</title>
      </Head>

      <Flex direction={{ base: 'column', lg: 'row' }}>
        <Center>
          <Heading size="lg">I am provider page</Heading>
          <Provider />
        </Center>
      </Flex>
    </>
  );
}

export default ProviderPage;
