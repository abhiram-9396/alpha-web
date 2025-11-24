import { client } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
    return builder.image(source);
}

const POST_QUERY = `*[
  _type == "post" && slug.current == $slug
][0]{
  title,
  mainImage,
  body,
  publishedAt,
  "authorName": author->name
}`;

const options = { next: { revalidate: 60 } };

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await client.fetch(POST_QUERY, { slug }, options);

    if (!post) {
        notFound();
    }

    return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8">
            <div className="mb-8">
                <Link href="/" className="text-blue-500 hover:underline">
                    ← Back to posts
                </Link>
            </div>

            <article className="prose lg:prose-xl">
                <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>

                <div className="mb-8 flex items-center gap-4 text-gray-500">
                    {post.authorName && <p>By {post.authorName}</p>}
                    <p>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>

                {post.mainImage && (
                    <div className="mb-8">
                        <Image
                            src={urlFor(post.mainImage).width(800).height(400).url()}
                            alt={post.title}
                            width={800}
                            height={400}
                            className="rounded-lg object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="mt-8">
                    <PortableText value={post.body} />
                </div>
            </article>
        </main>
    );
}
