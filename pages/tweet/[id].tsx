import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Tweet } from "..";
import { useSession } from "next-auth/react";

interface TweetResponse {
  ok: boolean;
  tweet: Tweet;
}

export default function TweetDetail() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/login");
    }
  }, [status, router]);

  const { data } = useSWR<TweetResponse>(
    router.query.id ? `/api/tweet/${router.query.id}` : null
  );

  console.log(data);

  return (
    <Container maxWidth="sm">
      <h1></h1>
      {data?.ok ? (
        <List>
          <ListItem button>
            <ListItemAvatar>
              <Avatar alt={data.tweet.user.username?.toUpperCase()} />
            </ListItemAvatar>
            <ListItemText
              primary={data.tweet.user.username}
              secondary={data.tweet.message}
            />
          </ListItem>
        </List>
      ) : null}
    </Container>
  );
}
