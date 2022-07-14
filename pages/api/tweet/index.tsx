// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import clinet from "../../../lib/server/client";
// import { authOptions } from "../auth/[...nextauth]";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const tweets = await clinet.twitter.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    // console.log(tweets);
    res.json({
      ok: true,
      tweets,
    });
  }
  if (req.method === "POST") {
    // const session = await unstable_getServerSession(req, res, authOptions);
    const { tweet, name } = req.body;
    console.log(tweet, name);

    const user = await client?.user.findUnique({
      where: {
        username: name,
      },
    });

    if (!user) {
      return res.status(401).json({ ok: false, error: "user not found" });
    }
    await client?.twitter.create({
      data: {
        message: tweet,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
    });
  }
}
