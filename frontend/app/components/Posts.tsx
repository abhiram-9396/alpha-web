import Link from "next/link";
import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function Posts() {
    const posts = await client.fetch(POSTS_QUERY, {}, options);
    console.log("Fetched posts:", posts);
    console.log("Project ID:", client.config().projectId);
    console.log("Dataset:", client.config().dataset);

    return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8">
            <h1 className="mb-8 text-4xl font-bold">Posts</h1>
            <ul className="flex flex-col gap-y-4">
                {posts.map((post: any) => (
                    <li className="hover:underline" key={post._id}>
                        <Link href={`/posts/${post.slug.current}`}>
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="text-sm text-gray-500">
                                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
