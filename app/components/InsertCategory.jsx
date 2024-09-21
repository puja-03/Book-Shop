"use client";
import { record, z } from "zod";
import React from "react";
import Toast from "react-hot-toast"
import { handleSubmit } from "../action";
const InsertCategory = () => {
  let category = z.object({
    cat_title: z.string().min(1, { message: " Required" }),
    cat_description: z.string().min(1,{message:"Required"})
  });

  let clientAction = async (formData) => {
    let record = {
      cat_title: formData.get("cat_title"),
      cat_description: formData.get("cat_description"),
    };

    let data = category.safeParse(record);
    if (!data.success) {
      let errorMsg = "";
      data.error.issues.forEach((issue) => {
        Toast.error=(issue.path[0]+":" + issue.message)
      });
      
      return;
    }

     await handleSubmit(formData);
  };

  return (
    <div className="bg-gray-400 shadow-lg rounded border-slate-900 p-2">
      <form action={clientAction} method="POST">
        <div className="mb-3 flex flex-1 gap-2 flex-col">
          <label htmlFor="cat_title">Category title</label>
          <input
            type="text"
            placeholder="Enter your title"
            className="border text-black rounded px-2 py-2"
            id="cat_title"
            name="cat_title"
          />
        </div>
        <div className="mb-3 flex flex-1 gap-2 flex-col">
          <label htmlFor="cat_description">Category Description</label>
          <textarea
            rows={10}
            placeholder="Enter your Description"
            className="border text-black rounded px-2 py-2"
            id="cat_description"
            name="cat_description"
          ></textarea>
        </div>

        <div className="mb-3 flex-1 gap-2 flex flex-col w-full">
          <button
            type="submit"
            className="bg-red-400 text-white px-3 py-2 rounded w-full hover:bg-red-900"
          >
            create category
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsertCategory;
