import { objectType, extendType, nonNull, stringArg } from 'nexus';

import { generateUserToken } from '../../lib/twilio';

// Twilio Token Type
export const TwilioAuthToken = objectType({
  name: 'TwilioAuthToken',
  description: 'Payload returned if login or signup is successful',
  definition(t) {
    t.string('token', {
      description: 'The current Twilio JWT token. Use in Authentication header',
    });
  },
});

// Queries
export const TwilioQueries = extendType({
  type: 'Query',
  definition: (t) => {
    // Me Query
    t.field('twilioToken', {
      type: 'TwilioAuthToken',
      description: 'Returns the twilio auth token for user',
      args: {
        username: nonNull(stringArg()),
      },
      resolve: (_root, _args) => {
        return { token: generateUserToken(_args.username) };
      },
    });
  },
});
