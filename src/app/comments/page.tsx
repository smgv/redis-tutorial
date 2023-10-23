import { redis } from "@/lib/redis";
// import axios from "axios";
import Link from "next/link";

const Page = async () => {
  const commentIds = await redis.lrange("comments", 0, 3);

  const comments = await Promise.all(
    commentIds.map(async (commentId) => {
      //   const details = await redis.hgetall(`comment_details:${commentId}`);
      //   const tags = await redis.smembers(`tags:${commentId}`);
      //   return {
      //     details,
      //     tags,
      //     commentId,
      //   };

      //   commenting above section to reduce the redis calls by using redis.json.get
      const details = await redis.json.get(`comment:${commentId}`);
      return {
        details,
        commentId,
      };
    })
  );

  //   const upvoteComments = async (commentId: string) => {
  //     const { data } = await axios.post("/api/upvote", {
  //       commentId,
  //     });

  //     console.log(data, "COMMENTS");
  //   };

  return (
    <div className="flex flex-col gap-8 items-start">
      <Link href="/" prefetch={false}>
        HomePage
      </Link>
      {comments.map(
        (
          comment: {
            details: { author: string; text: string; tags: string };
            commentId: string;
          },
          idx
        ) => (
          <div className="flex flex-col gap-2" key={idx}>
            <h1>
              {comment.details.author} - {comment.details.text}
            </h1>
            <p>{comment.details.tags}</p>
            {/* <button onClick={() => upvoteComments(comment.commentId)}>
              upvote comments
            </button> */}
          </div>
        )
      )}
    </div>
  );
};

export default Page;
