import { objectType, extendType, stringArg, nonNull } from 'nexus';

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
      args: {
        meetingId: nonNull(stringArg()),
      },
      description: 'Returns the twilio auth token for user',
      resolve: async (_root, args, ctx) => {
        const { meetingId } = args;

        const meeting = await ctx.prisma.meeting.findFirst({
          where: {
            id: meetingId,
          },
          include: {
            users: true,
          },
        });

        if (meeting && meeting.users.find((user) => user.id === ctx.user.id)) {
          return { token: generateUserToken(ctx.user?.email) };
        }

        return {
          token: null,
        };
      },
    });
  },
});
