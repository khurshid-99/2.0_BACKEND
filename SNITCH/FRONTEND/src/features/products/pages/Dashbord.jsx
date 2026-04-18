import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../hooks/product.hook";

const Dashbord = () => {
  const { handleGetSellerProducts } = useProduct();
  const sellerProduct = useSelector((state) => state.product.sellerProducts);
  const loading = useSelector((state) => state.product.loading);
  const errror = useSelector((state) => state.product.error);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  if (loading) {
    return (
      <main className="w-full h-screen flex items-center justify-center ">
        <h1 className="text-[10rem] text-[red] text-center ">Loading...</h1>;
      </main>
    );
  }

  if (!loading && sellerProduct.length > 0) {
    console.log(sellerProduct);
    // setProducts(sellerProduct);
  }

  // console.log(sellerProduct);
  return (
    <div className="flex gap-2 px-4 py-2 ">
      {sellerProduct &&
        sellerProduct.map((item) => (
          <div
            key={item._id}
            className="rounded overflow-hidden bg-amber-500 flex flex-col gap-1  "
          >
            <img
              src={item.images[0].url}
              alt=""
              className="w-[20rem] h-[25rem] object-cover object-center "
            />

            <div className="px-1 pb-1 ">
              <h1>{item.title}</h1>
              <h1>{item.description}</h1>
              <h1>
                <span> {item.price.amount}</span>
                <span> {item.price.currency}</span>
              </h1>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Dashbord;
