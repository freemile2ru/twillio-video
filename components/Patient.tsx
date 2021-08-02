import React, { useState } from 'react';
import { FormControl, Input, Button, FormLabel, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';

import { setErrorsFromGraphQLErrors } from '../utils/setErrors';
import { useCreateMeetingMutationMutation } from '../types';

import { ErrorText } from './ErrorText';

export const CREATE_MEETING_MUTATION = gql`
  mutation createMeetingMutation($data: MeetingCreateInput!) {
    createMeetingMutation(data: $data) {
      id
      name
      reasonForVisit
    }
  }
`;

/** Description of component */
export function Patient() {
  const { register, handleSubmit, errors, setError } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [createMeetingMutation] = useCreateMeetingMutationMutation();
  const router = useRouter();

  /**
   * Submits the login form
   * @param formData the data passed from the form hook
   */
  async function handleSubmitMeeting(formData) {
    try {
      setIsLoading(true);
      const { data } = await createMeetingMutation({ variables: formData });
      window.localStorage.setItem('meetingId', data.createMeetingMutation.id);
      await router.replace('/video');
    } catch (e) {
      setErrorsFromGraphQLErrors(setError, e.graphQLErrors);
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitMeeting)}>
      <Stack spacing={4}>
        <FormControl id="name">
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="text"
            name="name"
            ref={register({
              required: 'name is required',
            })}
            isInvalid={errors.name}
          />
          <ErrorText>{errors.name && errors.name.message}</ErrorText>
        </FormControl>

        <FormControl id="reasonForVisit">
          <FormLabel htmlFor="reasonForVisit">Reason For Visit</FormLabel>
          <Input
            type="reasonForVisit"
            name="reasonForVisit"
            ref={register({ required: 'reasonForVisit is required' })}
            isInvalid={errors.reasonForVisit}
          />
          <ErrorText>{errors.reasonForVisit && errors.reasonForVisit.message}</ErrorText>
        </FormControl>
      </Stack>

      <Button
        type="submit"
        marginTop={8}
        width="full"
        isLoading={isLoading}
        onClick={handleSubmit(handleSubmitMeeting)}
      >
        Submit
      </Button>
    </form>
  );
}
