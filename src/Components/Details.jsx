import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";

function Details() {
  const { products, setProducts } = useContext(ProductContext);
  const { id } = useParams();
  const [Product, SetProduct] = useState(null);
  let navigate = useNavigate();

  const productdeletehandler = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    let filteredproduct = products.filter((p) => p.id !== id)
    setProducts(filteredproduct);
    localStorage.setItem('products', JSON.stringify(filteredproduct));
    navigate("/");

  }

  useEffect(() => {
    let allProducts = products;
    // Agar context me products nahi hai to localStorage se lo
    if (!allProducts || !Array.isArray(allProducts)) {
      allProducts = JSON.parse(localStorage.getItem("products")) || [];
    }
    // id string ho sakti hai, isliye String compare karo
    const found = allProducts.find((p) => String(p.id) === String(id));
    SetProduct(found || null);
  }, [products, id]);

  return Product ? (
    <div className="h-full max-h-[600px] md:w-[80%] text-center pt-20 pr-5 md:px-[15%] md:py-[10%] md:flex md:flex-row items-center justify-center gap-1 md:gap-12 flex-col pr-8">
      <div className="flex justify-center items-center">
        <img
          src={Product.image}
          alt={Product.title}
          className="md:h-[40vh] max-h-[190px] max-w-[200px] mt-4 md:w-[60vw] mb-2 md:bg-center md:bg-contain md:bg-no-repeat md:mr-8  "
        />
        </div>
      <div className="flex flex-col ml-8 pl-4 mb-2 mt-4">
        <h1 className="md:text-4xl text-3xl mb-2">{Product.title}</h1>
        <h2 className="text-zinc-500 text-xs mb-2">{Product.category}</h2>
        <h2 className="text-red-300 text-xs mb-2">$ {Product.price}</h2>
        <h3 className="text-xs mb-2">{Product.description}</h3>
        <div className="flex justify-center items-center text-center gap-2 md:mt-4 mt-3">
          <Link
            to={`/Edit/${Product, id}`}
            className="px-4 py-2 rounded border text-red-700 font-semibold border-red-300 transition ease-in-out duration-200 hover:bg-red-400 bg-red-200 hover:text-white transform hover:translate-y-1.2]">
            Edit
          </Link>
          <button
            onClick={() => productdeletehandler(Product.id)}
            className="px-4 py-2 rounded border border-blue-300 text-blue-700 font-semibold transition ease-in-out duration-200 hover:bg-blue-400 bg-blue-200 hover:text-white hover:translate-y-1.2]">
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading....</div>
  );
}

export default Details;