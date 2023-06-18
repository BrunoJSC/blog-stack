import Link from "next/link";

async function fetchBlogs() {
  const res = await fetch("http://localhost:3000/api/blog", {
    next: {
      revalidate: 10,
    },
  });

  const data = await res.json();
  console.log(data);
  return data;
}

export default async function Home() {
  const posts = await fetchBlogs();
  console.log(posts);

  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 dm:w-3/4 m-auto p-4 my-4 rounded-xl bg-slate-800 drop-shadow-lg">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold">
          Blog App Next.js
        </h1>
      </div>

      <div className="flex">
        <Link
          href={"/blog/add"}
          className="md:w-1/6 text-center sm:2/4 rounded-md p-2 m-auto bg-slate-200 font-semibold"
        >
          Add new blog post +
        </Link>
      </div>

      <div className="w-full flex flex-col justify-center items-center ">
        {posts?.map((post: any) => (
          <div
            key={post.id}
            className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center"
          >
            <div className="flex items-center my-3">
              <div className="mr-auto">
                <h2 className="mr-auto font-semibold">{post.title}</h2>
              </div>
              <Link
                className="bg-slate-800 text-slate-200 rounded-md p-2"
                href={`/blog/edit/${post.id}`}
              >
                Edit
              </Link>
            </div>

            <div className="mr-auto my-1">
              <blockquote className="text-slate-800">
                {new Date(post.date).toDateString()}
              </blockquote>
            </div>

            <div className="mr-auto my-1">
              <h2 className="text-slate-800">{post.description}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
