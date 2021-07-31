import { objectType, extendType, nonNull, stringArg } from 'nexus';

import { generateUserToken } from '../../lib/twilio';

// Twilio Token Type
export const TwilioAuthToken = objectType({
  name: 'TwilioAuthToken',
  description: 'Payload returned if query twilio token is successful',
  definition(t) {
    t.string('token', {
      description: 'The current Twilio JWT token',
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
      resolve: (_root, _args, ctx) => {
        return { token: generateUserToken(ctx.user?.email) };
      },
    });
  },
});
