import type { NextPage } from "next";
import {
  Stack,
  Button,
  Container,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  Box,
} from "@mui/material";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import useMutation from "../lib/clinet/useMutation";
import useSWR from "swr";
import { User } from "@prisma/client";

interface MutationResult {
  ok: boolean;
}

export interface Tweet {
  id: number;
  user: User;
  message: string;
}

interface TweetsResponse {
  ok: boolean;
  tweets: Tweet[];
}

const Home: NextPage = () => {
  const [createTweet, { loading, data, error }] =
    useMutation<MutationResult>("/api/tweet");
  const { data: tweets, mutate } = useSWR<TweetsResponse>("/api/tweet");
  const router = useRouter();
  const [value, setValue] = useState(0);

  const { data: session, status } = useSession();

  // console.log(session);

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/login");
    }
  }, [status, router]);

  const [tweet, setTweet] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // const tweet = tweet;
    const name = session?.user?.name;

    if (tweet) {
      createTweet({ tweet, name });
      setTweet("");

      // document.getElementById("tweet").value = "";
    }
  };

  useEffect(() => {
    if (data?.ok) {
      // router?.push("/login");

      mutate();
    }
  }, [data, mutate]);

  return (
    <Container maxWidth="sm">
      <h1>{session?.user?.name}님 안녕하세요!</h1>
      {/* <p>{session?.user.name}</p> */}

      <CssBaseline />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          id="tweet"
          name="tweet"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          label="무슨 일이 일어나고 있나요?"
          variant="outlined"
          fullWidth
          multiline
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          트윗하기
        </Button>
      </Box>
      <List>
        {tweets?.tweets.map(({ id, user, message }) => (
          <Link href={`/tweet/${id}`} key={id}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar
                  alt={user.username?.toUpperCase()}
                  // src={user.username}
                />
              </ListItemAvatar>
              <ListItemText primary={user.username} secondary={message} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Box sx={{ p: 5 }} />

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction
            onClick={() => signOut()}
            label="Log Out"
            icon={<LogoutIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Container>
  );
};

export default Home;
