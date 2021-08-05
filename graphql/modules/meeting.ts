import { objectType, extendType, arg, nonNull, inputObjectType } from 'nexus';

import { isAdmin } from '../../services/permissions';

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
      authorize: (_root, _args, ctx) => !!ctx.user && isAdmin(ctx.user),
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

    t.field('activeMeeting', {
      type: 'Meeting',
      authorize: (_root, _args, ctx) => !!ctx.user,
      description: 'Returns active meetings',
      resolve: (_root, args, ctx) => {
        return ctx.prisma.meeting.findFirst({
          where: {
            completed: false,
            users: {
              some: {
                id: ctx.user.id,
              },
            },
          },
          include: {
            users: true,
          },
        });
      },
    });
  },
});

// Mutations
export const MeetingMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createMeeting', {
      type: 'Meeting',
      description: 'Patient Initialize/ request for a meeting ',
      args: {
        data: nonNull(arg({ type: 'MeetingCreateInput' })),
      },
      authorize: (_root, _args, ctx) => !!ctx.user,
      resolve: async (_root, args, ctx) => {
        const { name, reasonForVisit } = args.data;

        return await ctx.prisma.meeting.create({
          data: {
            name,
            reasonForVisit,
            users: {
              connect: {
                id: ctx.user.id,
              },
            },
          },
        });
      },
    });

    t.field('joinMeeting', {
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
              connect: {
                id: ctx.user.id,
              },
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
