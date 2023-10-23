import { redis } from "@/lib/redis";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { text, tags } = body;

    const comment = {
      text,
      tags,
      timestamp: new Date(),
      upVotes: 0,
      author: req.cookies.get("userId")?.value || "",
    };

    const commentId = nanoid();

    await Promise.all([
      // add comment to list
      redis.rpush("comments", commentId),
      redis.json.set(`comment:${commentId}`, "$", comment),

      // this is commented to reduce the redis calls by using redis.json.set
      // add tags to comment
      // redis.sadd(`tags:${commentId}`, tags),
      //store and retrieve comments details
      // redis.hset(`comment_details:${commentId}`, comment),
    ]);

    return new Response("OK");
  } catch (error) {
    console.log(error);
  }
};
