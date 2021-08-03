import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';

import {
  useCreateMeetingMutation,
  useJoinMeetingMutation,
  useMeetingsLazyQuery,
  Meeting,
  User,
} from '../types';
import { FullPageSpinner } from '../components/FullPageSpinner';
import { setErrorsFromGraphQLErrors } from '../utils/setErrors';

export const JOIN_MEETING_MUTATION = gql`
  mutation joinMeeting($data: JoinMeetingInput!) {
    joinMeeting(data: $data) {
      id
      name
      reasonForVisit
    }
  }
`;

export const MEETINGS_QUERY = gql`
  query meetings {
    meetings {
      name
      reasonForVisit
      users {
        id
      }
    }
  }
`;

export const CREATE_MEETING_MUTATION = gql`
  mutation createMeeting($data: MeetingCreateInput!) {
    createMeeting(data: $data) {
      id
      name
      reasonForVisit
    }
  }
`;

const MeetingContext = createContext<MeetingContextObject>({});
MeetingContext.displayName = 'MeetingContext';

function MeetingProvider({ ...props }: Props) {
  const [meetings, setMeetings] = useState([]);
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMeetings, { data }] = useMeetingsLazyQuery();
  const [createMeeting] = useCreateMeetingMutation();
  const [joinMeeting] = useJoinMeetingMutation();
  const router = useRouter();

  // Load current token if there's an item in local storage

  useEffect(() => {
    if (data) {
      setMeetings(data.meetings);
    }
  }, [data]);

  if (loading) {
    return <FullPageSpinner />;
  }

  const handleCreateMeeting = async (formData, setError) => {
    try {
      setLoading(true);
      const { data } = await createMeeting({ variables: formData });
      setMeeting(data.createMeeting.id);
      await router.replace('/video');
    } catch (e) {
      setErrorsFromGraphQLErrors(setError, e.graphQLErrors);
    }

    setLoading(false);
  };

  const handleJoinMeeting = async (meetingId: string, setError) => {
    try {
      setLoading(true);
      const { data } = await joinMeeting({ variables: { data: { id: meetingId } } });
      setMeeting(data.joinMeeting.id);
      await router.replace('/video');
    } catch (e) {
      setErrorsFromGraphQLErrors(setError, e.graphQLErrors);
    }

    setLoading(false);
  };

  const fetchMeetingRequests = async () => {
    setLoading(true);
    await loadMeetings();
    setLoading(false);
  };

  const value = {
    state: {
      meetings,
      meeting,
      loading,
    },
    fetchMeetingRequests,
    handleCreateMeeting,
    handleJoinMeeting,
  };

  return <MeetingContext.Provider value={value} {...props} />;
}

const useMeeting = () => useContext(MeetingContext);
export { MeetingProvider, useMeeting };

interface Props {
  loggedInUser?: Partial<User>;
  children: ReactNode;
}

export interface MeetingContextObject {
  state?: {
    meetings: Meeting[];
    meeting: string;
    loading: boolean;
  };
  fetchMeetingRequests?: () => any;
  handleCreateMeeting?: (formData: { name: string; reasonForVisit: string }, setError: any) => any;
  handleJoinMeeting?: (meetingId: string, setError: any) => any;
}
