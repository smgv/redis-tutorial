"use client";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const addComment = async () => {
    const { data } = await axios.post("/api/comment", {
      text: "hello",
      tags: ["typescript"],
    });

    console.log(data, "COMMENTS");
  };
  return (
    <div className="flex flex-col gap-8 items-start">
      <Link href="/comments" prefetch={false}>
        See Comments
      </Link>
      <button onClick={addComment}>make comments</button>
    </div>
  );
}
