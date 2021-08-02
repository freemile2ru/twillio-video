import Chance from 'chance';
import { User } from '@prisma/client';

import { buildPrismaIncludeFromAttrs, prisma } from '../helpers';
import { hashPassword } from '../../services/auth';

const chance = new Chance();

interface UserAttrs extends Omit<Partial<User>, 'role'> {
  role?: string;
}

export const UserFactory = {
  build: (attrs: UserAttrs = {}) => {
    return {
      id: chance.guid(),
      email: chance.email(),
      password: 'test1234',
      role: 'PATIENT',
      ...attrs,
    };
  },

  create: async (attrs: UserAttrs = {}) => {
    const user = UserFactory.build(attrs);
    const options: Record<string, any> = {};
    const includes = buildPrismaIncludeFromAttrs(attrs);
    if (includes) options.include = includes;

    return await prisma.user.create({
      data: { ...user, password: hashPassword(user.password), role: user.role as any },
      ...options,
    });
  },
};
