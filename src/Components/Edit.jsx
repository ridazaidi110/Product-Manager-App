import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../utils/Context';
import { nanoid } from 'nanoid';

function Edit() {
    const { products, setProducts } = useContext(ProductContext);
    const [product, setproduct] = useState(null)
    const navigate = useNavigate();
    const { id } = useParams();
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const foundProduct = products.find((p) => String(p.id) === String(id));
        setproduct(foundProduct);
            console.log(foundProduct);
        if (foundProduct) {
            setImage(foundProduct.image);
            setCategory(foundProduct.category)
            setPrice(foundProduct.price)
            setDescription(foundProduct.description)
            setTitle(foundProduct.title);
        }
    }, [id, products])
    console.log(product);
    const EditProductHandler = (e) => {
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
        const updatedProduct = {
            id: id,
            title,
            image,
            category,
            description,
            price,
        }
        const updatedProducts = products.map((item) => {
            return String(item.id) === String(id) ? updatedProduct : item;
        });
        
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        navigate("/");


        // Reset form
        setImage("");
        setTitle("");
        setCategory("");
        setPrice("");
        setDescription("");

    };
    return (
        <>
            <form
                onSubmit={EditProductHandler}
                className="h-screen w-screen p-8 flex items-center justify-center m-auto flex-col mb-8"
            >
                <h1 className="text-2xl md:w-1/2 mb-4 ml-7">Edit New Product</h1>

                <input
                    type="url"
                    placeholder="Image Link"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="text-xl bg-zinc-100 rounded p-2 md:w-[48%] w-[80%] h-11 mb-3"
                />

                <div className="flex justify-between md:w-[48%] w-[80%]">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-xl bg-zinc-100 rounded p-2 md:w-[48%] w-full h-11 mb-3"
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="text-xl bg-zinc-100 rounded p-2 md:w-[48%] w-full h-11 mb-3"
                    />
                </div>

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="text-xl bg-zinc-100 rounded p-2 md:w-[48%] w-[80%] h-11 mb-3"
                />

                <textarea
                    placeholder="Enter product description here..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="10"
                    className="text-xl bg-zinc-100 rounded p-2 md:w-[48%] w-[80%] mb-3"
                />
                <button
                    type="submit"
                    className="border border-blue-200 bg-blue-100 px-4 rounded-md py-1 hover:bg-blue-300 transition-all"
                >
                    Update Product
                </button>
            </form>
        </>
    )
}

export default Edit