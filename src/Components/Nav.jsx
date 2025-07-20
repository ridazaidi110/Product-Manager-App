import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { HiMenu, HiX } from "react-icons/hi";

function Nav() {
  //code for humburger menu
  const [isOpen, setisOpen] = useState(false);
  const { products } = useContext(ProductContext);
  // togglemenu function imp for mobile
  const toggleMenu = () => {
    setisOpen(!isOpen);
  };
  let distinctCategory = Array.isArray(products)
    ? products.reduce((acc, cv) => {
        if (cv && cv.category) return [...acc, cv.category];
        return acc;
      }, [])
    : [];
  distinctCategory = [...new Set(distinctCategory)];

  console.log(distinctCategory);
  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed(0)},${(
      Math.random() * 255
    ).toFixed(0)},${(Math.random() * 255).toFixed(0)},0.4)`;
  };
  console.log(color());
  return (
    <>
      <nav
        className=" 
        w-full md:w-[18%]
    fixed md:fixed left-0 top-0
    h-auto md:h-screen
    bg-zinc-100 py-4 p-2 z-10
    flex md:block
    overflow-x-auto md:overflow-x-scroll
    border-b md:border-b-0 gap-4"
      >
        <div className="flex justify-between gap-20">
          <div>
            <Link
              to="/create"
              className="border border-blue-300 px-4 ml-2 rounded-md py-2 whitespace-nowrap hover:bg-blue-300 bg-blue-100 font-semibold"
            >
              Add New Cart
            </Link>
          </div>
          <div>
            <button onClick={toggleMenu} className="text-3xl md:hidden ml-34  ">
              {isOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>

        <hr className="w-[80%] md:mt-[9%] text-base font-semibold hidden md:block"></hr>
        {/* Show categories based on isOpen (on mobile) and always on desktop */}

          <div
            className={`${isOpen ? "block" : "hidden"} md:block 
    fixed md:static 
    left-0 top-0 
    w-full md:w-auto 
    h-full md:h-auto 
    bg-white md:bg-transparent 
    z-50 md:z-auto 
    flex flex-col items-center justify-start 
    pt-20 md:pt-4 
    overflow-y-auto`}
          >
            <h2 className="text-lg font-semibold mt-5 ml-6 md:ml-0">
              Category Filter
            </h2>
            <div className="flex flex-col md:flex-col gap-4 w-full max-w-md mx-auto overflow-y-auto mt-4">
              {distinctCategory.map((category, i) => (
                <Link
                  key={category || i}
                  to={`/?category=${category}`}
                  className="flex items-center gap-2 whitespace-nowrap px-6 py-3 border-b border-zinc-200 w-full text-lg"
                  onClick={() => setisOpen(false)}
                >
                  <span
                    style={{ backgroundColor: color() }}
                    className="block h-[12px] w-[12px] rounded-full"
                  ></span>
                  {category}
                </Link>
              ))}
            </div>
          </div>
        
      </nav>
    </>
  );
}

export default Nav;
