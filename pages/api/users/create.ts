// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clinet from "../../../lib/server/client";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { name, password } = req.body;

  const alreadyUser = await clinet.user.findUnique({
    where: { name },
  });

  console.log(alreadyUser);

  if (!alreadyUser && client) {
    await client.user.create({
      data: {
        name,
        password,
      },
    });
  } else {
    return res.json({
      ok: false,
    });
  }
  return res.json({
    ok: true,
  });
}
