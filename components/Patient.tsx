import React from 'react';
import { FormControl, Input, Button, FormLabel, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { useMeeting } from '../context/meetings';

import { ErrorText } from './ErrorText';

/** Description of component */
export function Patient() {
  const { register, handleSubmit, errors, setError } = useForm();

  const {
    state: { loading },
    handleCreateMeeting,
  } = useMeeting();

  const router = useRouter();

  /**
   * Submits the meeting request form
   * @param formData the data passed from the form hook
   */
  async function handleSubmitMeeting(formData) {
    await handleCreateMeeting(formData, setError);
    await router.replace('/video');
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
        isLoading={loading}
        onClick={handleSubmit(handleSubmitMeeting)}
      >
        Submit
      </Button>
    </form>
  );
}
