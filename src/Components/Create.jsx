import React, { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { ProductContext } from "../utils/Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Create() {
  const { products, setProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 4 ||
      category.trim().length < 4 ||
      price.trim().length < 1 ||
      description.trim().length < 4 ||
      image.trim().length < 4
    ) {
      alert("All fields must have at least 4 characters");
      return;
    }

    const product = {
      id: nanoid(),
      title,
      image,
      category,
      description,
      price,
    };

    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    toast.success('Product Added Successfully');

    // Reset form
    setImage("");
    setTitle("");
    setCategory("");
    setPrice("");
    setDescription("");

    // Navigate to home
    navigate("/");
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="h-full w-full pt-14 md:p-8 flex items-center m-auto flex-col"
    >
      <h1 className="text-2xl md:w-1/2 mb-3 ml-4 mt-3 md:mt-0 mb-10">Add New Product</h1>

      <input
        type="url"
        placeholder="Image Link"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="text-xl bg-zinc-100 rounded p-2 md:w-[48%] w-[80%] h-11 mb-3"
      />

      <div className="flex md:justify-between flex-col md:flex-row md:w-[48%] w-[80%] ">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl bg-zinc-100 rounded h-11 p-2 md:w-[48%] w-full mb-3"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-xl bg-zinc-100 rounded h-11 p-2 md:w-[48%] w-full mb-3"
        />
      </div>

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="text-xl bg-zinc-100 rounded p-2 h-11 md:w-[48%] w-[80%] mb-3"
      />

      <textarea
        placeholder="Enter product description here..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="10"
        className="text-xl bg-zinc-100 rounded p-2 w-[80%] md:w-[48%] w-[80%] mb-3"
      />

      <button
        type="submit"
        className="border border-blue-200 bg-blue-100 px-5 rounded-md py-2 hover:bg-blue-300 transition-all"
      >
        Add Product
      </button>
    </form>
  );
}

export default Create;
