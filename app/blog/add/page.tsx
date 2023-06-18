"use client";

import { FormEvent, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function AddBlog() {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  async function postBlog({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    const res = fetch("http://localhost:3000/api/blog", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return (await res).json();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (titleRef.current && descriptionRef.current) {
      toast.loading("Submitting blog post...", { id: "submitting" });
      await postBlog({
        title: titleRef.current?.value || "",
        description: descriptionRef.current?.value || "",
      });
      toast.success("Blog post submitted!", { id: "submitting" });
    }
  }

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-content items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Add new blog post 🚀
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

            <button className="p-2 m-2 rounded-md bg-slate-200 text-slate-800 font-semibold">
              submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
