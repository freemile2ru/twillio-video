import React from 'react';
import Head from 'next/head';
import { Heading, Center, Flex } from '@chakra-ui/react';

import { Patient } from '../components/Patient';

function PatientPage() {
  return (
    <>
      <Head>
        <title>PatientPage</title>
      </Head>

      <Flex direction={{ base: 'column', lg: 'row' }}>
        <Center>
          <Heading size="lg">I am patient page</Heading>
          <Patient />
        </Center>
      </Flex>
    </>
  );
}

export default PatientPage;
