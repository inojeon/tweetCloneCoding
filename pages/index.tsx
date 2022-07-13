import type { NextPage } from "next";
import { Stack, Button, Container } from "@mui/material";

import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  // console.log(session, status);

  return (
    <Container maxWidth="md">
      ...
      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div>
          {session ? (
            <>
              {/* Signed in as {session.user.username} <br /> */}
              <button onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <>
              Not signed in <br />
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
        </div>
        <Stack spacing={2} direction="row">
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Stack>
        ...
      </main>
      ...
    </Container>
  );
};

export default Home;
