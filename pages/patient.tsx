import React from 'react';
import Head from 'next/head';
import { Heading } from '@chakra-ui/react';

import { Patient } from '../components/Patient';

function PatientPage() {
  return (
    <>
      <Head>
        <title>PatientPage</title>
      </Head>

      <Heading size="lg">I am patient page</Heading>
      <Patient />
    </>
  );
}

export default PatientPage;
