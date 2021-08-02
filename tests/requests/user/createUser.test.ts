import { resetDB, disconnect, graphQLRequestAsUser } from '../../helpers';
import { UserFactory } from '../../factories/user';

beforeEach(async () => resetDB());
afterAll(async () => disconnect());

describe('User createUser mutation', () => {
  describe('non-admin', () => {
    it('returns a Forbidden error', async () => {
      const query = `
        mutation SIGNUP($data: UserCreateInput!) {
          createUser(data: $data) {
            id
            email
          }
        }
      `;

      const user = await UserFactory.create({ email: 'foo@wee.net' });

      const variables = { data: { email: user.email, password: 'fake' } };
      const response = await graphQLRequestAsUser(user, { query, variables });
      const errorMessages = response.body.errors.map((e) => e.message);

      expect(errorMessages).toMatchInlineSnapshot(`
        Array [
          "Not authorized",
        ]
      `);
    });
  });

  describe('admin', () => {
    it('allows setting role', async () => {
      const query = `
        mutation SIGNUP($data: UserCreateInput!) {
          createUser(data: $data) {
            id
            role
          }
        }
      `;

      const admin = await UserFactory.create({ role: 'PROVIDER' });

      const variables = {
        data: { email: 'hello@wee.net', password: 'fake', role: 'PROVIDER' },
      };

      const response = await graphQLRequestAsUser(admin, { query, variables });
      const user = response.body.data.createUser;

      const expectedRoles = 'PROVIDER';
      expect(user.id).not.toBeNull();
      expect(user.role).toEqual(expectedRoles);
    });
  });
});
