import { router, publicProcedure } from './trpc';
import { sequelize as db } from './db';
import { z } from 'zod';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

export const appRouter = router({
  userList: publicProcedure.query(async () => {
    const users = await db.models.User.findAll();

    return users;
  }),
  userById: publicProcedure.input(z.number()).query(async opts => {
    const { input } = opts;

    const user = await db.models.User.findOne({ where: { id: input } });

    return user;
  }),

  userCreate: publicProcedure
    .input(
      z.object({
        first: z.string(),
        last: z.string(),
        age: z.number(),
      })
    )
    .mutation(async opts => {
      const { input } = opts;

      const user = await db.models.User.create({
        first: input.first,
        last: input.last,
        age: input.age,
      });

      return user;
    }),
});
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
