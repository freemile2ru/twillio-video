import { objectType, extendType, arg, nonNull, inputObjectType } from 'nexus';

// import { isAdmin } from '../services/permissions';

// Meeting Type
export const Meeting = objectType({
  name: 'Meeting',
  description: 'A Meeting',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('reasonForVisit');
    t.nonNull.boolean('completed');
    t.nonNull.date('createdAt');
    t.nonNull.date('updatedAt');
    t.nonNull.list.field('users', {
      type: 'User',
    });
  },
});

// Queries
export const MeetingQueries = extendType({
  type: 'Query',
  definition: (t) => {
    // List Meetings Query
    t.list.field('meetings', {
      type: 'Meeting',
      authorize: (_root, _args, ctx) => !!ctx.user,
      description: 'Returns available meetings',
      resolve: (_root, args, ctx) => {
        return ctx.prisma.meeting.findMany({
          where: {
            completed: false,
          },
          include: {
            users: true,
          },
        });
        // TODO
      },
    });
  },
});

// Mutations
export const MeetingMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createMeetingMutation', {
      type: 'Meeting',
      description: 'Patient Initialize/ request for a meeting ',
      args: {
        data: nonNull(arg({ type: 'MeetingCreateInput' })),
      },
      authorize: (_root, _args, ctx) => !!ctx.user,
      resolve: async (_root, args, ctx) => {
        const { name, reasonForVisit } = args.data;

        const meeting = await ctx.prisma.meeting.create({
          data: {
            name,
            reasonForVisit,
          },
        });

        return await ctx.prisma.meeting.update({
          where: {
            id: meeting.id,
          },
          data: {
            users: {
              set: [{ id: ctx.user.id }],
            },
          },
        });
      },
    });

    t.field('joinMeetingMutation', {
      type: 'Meeting',
      description: 'Patient Initialize/ request for a meeting ',
      args: {
        data: nonNull(arg({ type: 'JoinMeetingInput' })),
      },
      authorize: (_root, _args, ctx) => !!ctx.user,
      resolve: async (_root, args, ctx) => {
        const { id } = args.data;

        return await ctx.prisma.meeting.update({
          where: {
            id,
          },
          data: {
            users: {
              set: [{ id: ctx.user.id }],
            },
          },
        });
      },
    });
  },
});

export const MeetingCreateInput = inputObjectType({
  name: 'MeetingCreateInput',
  description: 'Input required for Patient Create Meeting',
  definition: (t) => {
    t.nonNull.string('name');
    t.nonNull.string('reasonForVisit');
  },
});

export const JoinMeetingInput = inputObjectType({
  name: 'JoinMeetingInput',
  description: 'Input required for Provider Join Meeting',
  definition: (t) => {
    t.nonNull.string('id');
  },
});
