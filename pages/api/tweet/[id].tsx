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
    const {
      query: { id },
    } = req;

    if (id) {
      const tweet = await clinet.twitter.findUnique({
        where: {
          id: +id.toString(),
        },
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      });

      res.json({
        ok: true,
        tweet,
      });
    }

    res.json({
      ok: false,
    });
    // console.log(tweets);
  }
}
