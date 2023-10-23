import { redis } from "@/lib/redis";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { commentId } = body;

    await redis.json.numincrby(`comment:${commentId}`, "$.upVotes", 1);

    return new Response("OK UpVoted");
  } catch (error) {
    console.log(error);
  }
};
