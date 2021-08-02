import { objectType, extendType, arg, nonNull } from 'nexus';

// import { isAdmin } from '../services/permissions';

// Meeting Type
export const Meeting = objectType({
  name: 'Meeting',
  description: 'A Meeting',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('meeting');
    t.nonNull.string('reasonForVisit');
    t.nonNull.boolean('completed');
    t.nonNull.date('createdAt');
    t.nonNull.date('updatedAt');
    t.field('users', {
      type: 'User',
      resolve: (parent, _, context) => {
        return context.prisma.meeting
          .findUnique({
            where: { id: parent.id },
          })
          .users();
      },
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
    t.field('somethingMutation', {
      type: 'String',
      description: 'Does something',
      args: {
        data: nonNull(arg({ type: 'SomethingMutationInput' })),
      },
      authorize: (_root, _args, ctx) => !!ctx.user,
      resolve: async (_root, args) => {
        console.log(args.data.hello);

        return args.data.hello;
      },
    });
  },
});
