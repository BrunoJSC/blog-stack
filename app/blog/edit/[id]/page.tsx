"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

async function getBlogById(id: string) {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);

  const data = await res.json();
  console.log(data);
  return data;
}

type UpdateBlogParams = {
  title: string;
  description: string;
  id: string;
};

async function updateBlog(data: UpdateBlogParams) {
  const res = fetch(`http://localhost:3000/api/blog/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: data.title,
      description: data.description,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res).json();
}

async function deleteBlog(id: string) {
  const res = fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",

    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res).json();
}

export default function EditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  console.log(params.id);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (titleRef.current && descriptionRef.current) {
      toast.loading("Submitting blog post...", { id: "submitting" });
      await updateBlog({
        title: titleRef.current?.value || "",
        description: descriptionRef.current?.value || "",
        id: params.id,
      });
      toast.success("Blog post submitted!", { id: "submitting" });
    }
    router.push("/");
  }

  async function handleDelete() {
    toast.loading("Deleting blog post...", { id: "deleting" });
    deleteBlog(params.id).then(() => {
      toast.success("Blog post deleted!", { id: "deleting" });
    });

    router.push("/");
  }

  useEffect(() => {
    toast.loading("Loading blog post...", { id: "loading" });
    getBlogById(params.id)
      .then((post) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = post.title;
          descriptionRef.current.value = post.description;
        }
        toast.success("Blog post loaded!", { id: "loading" });
      })
      .catch((err) => {
        toast.error("Error loading blog post!", { id: "loading" });
      });
  }, [params.id]);

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-content items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Edit blog post 🚀
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              placeholder="Title"
              className="p-2 m-2 rounded-md"
              ref={titleRef}
            />
            <textarea
              placeholder="Description"
              className="p-2 m-2 rounded-md"
              ref={descriptionRef}
            />

            <div className="flex justify-between">
              <button className="p-2 m-2 rounded-md bg-slate-200 text-slate-800 font-semibold">
                update blog post
              </button>
            </div>
          </form>

          <button
            onClick={handleDelete}
            className="p-2 m-2 rounded-md bg-slate-200 text-slate-800 font-semibold"
          >
            delete blog post
          </button>
        </div>
      </div>
    </>
  );
}
