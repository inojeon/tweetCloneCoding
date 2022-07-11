import type { NextPage } from "next";
import { Stack, Button, Container } from "@mui/material";

const Home: NextPage = () => {
  return (
    <Container maxWidth="md">
      ...
      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
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
