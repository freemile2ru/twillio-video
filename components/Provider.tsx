import React, { useState, useEffect } from 'react';
import {
  Center,
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
} from '@chakra-ui/react';

import { useMeeting } from '../context/meetings';

import { ErrorText } from './ErrorText';
import { FullPageSpinner } from './FullPageSpinner';

/** Description of component */
export function Provider() {
  const [error, setError] = useState({});

  const {
    state: { loading, meetings },
    handleJoinMeeting,
    fetchMeetingRequests,
  } = useMeeting();

  useEffect(() => {
    fetchMeetingRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <FullPageSpinner />;
  }

  return (
    <Center color="black" padding={{ base: 16, lg: 24 }}>
      {error && <ErrorText>Another Provider has joined the meeting</ErrorText>}
      <Accordion>
        {meetings.map((meeting, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Visit Request From {meeting.name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {meeting.reasonForVisit}
              <Box flex="1" textAlign="right">
                <Button colorScheme="blue" onClick={() => handleJoinMeeting(meeting.id, setError)}>
                  Join
                </Button>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Center>
  );
}
