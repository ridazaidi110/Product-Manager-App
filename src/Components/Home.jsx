import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { ProductContext } from "../utils/Context";
import { Link, useLocation } from "react-router-dom";
import axios from "../utils/axios";

function Home() {
  const { products } = useContext(ProductContext);
  const { search } = useLocation();

  // category safe way se decode karo
  const category = search ? decodeURIComponent(search.split("=")[1]) : null;

  const [filteredProduct, setFilteredProduct] = useState([]);

  // agar category selected hai to uske products lao
  const getProductCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setFilteredProduct(data);
    } catch (error) {
      console.log("Category fetch error:", error);
    }
  };
  console.log(products);
  useEffect(() => {
    if (!category) {
      setFilteredProduct(products || []);
    } else {
      // ✅ Local filter instead of API
      const localFiltered = (products || []).filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProduct(localFiltered);
    }
  }, [category, products]);


  return products.length > 0 ? (
    <>
      <Nav />
      <div className="
      flex flex-wrap w-full gap-10
       md:w-[82%] ml-[3%] md:ml-[18%] md:p-10 pt-[23%] 
       overflow-x-hidden overflow-y-auto
       min-h-screen
      ">
        {filteredProduct &&
          filteredProduct.filter((p) => p && p.id).map((p) => (
            <Link
              to={`/Details/${p.id}`}
              key={p.id}
              className="card border pt-8 border-zinc-300 rounded-md h-[60vw] sm:h-[32vw] md:h-[30vh] w-[90vw] sm:w-[45vw] md:w-[30vw] lg:w-[18%] flex flex-col justify-center items-center m-2 hover:shadow-lg transition duration-200 overflow-hidden transform hover:scale-1.4 "
            >
              <img
                src={p.image}
                alt={p.title}
                className="
                 h-[40vw] sm:h-[18vw] md:h-[65%] w-full
                w-[60vw] sm:w-[30vw] md:w-[50%] max-h-[180px] max-w-[170px]
                md:max-h-[200px]
                bg-contain bg-no-repeat bg-center
                hover:scale-110 transition duration-300"
              />
              <h1 className="text-sm p-2 text-center">{p.title}</h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <div className="text-center text-xl mt-10">Loading products...</div>
  );
}

export default Home;
