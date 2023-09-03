import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

// Insane autocompletion :o
const query = async () => {
  const createdUser = await trpc.userCreate.mutate({
    first: 'Foo',
    last: 'Bar',
    age: 13,
  });
  const user = await trpc.userById.query(1);

  console.log(createdUser);
  console.log(user);
};

query();
