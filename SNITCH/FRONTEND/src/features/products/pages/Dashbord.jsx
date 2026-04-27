import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../hooks/useProduct.hook";
import { Link } from "react-router";

function ProductCard({ data }) {
  // console.log(data);

  function formatPrice(value) {
    return new Intl.NumberFormat(`en`, {
      minimumFractionDigits: 2,
    }).format(value);
  }
  function setCurrency(currency) {
    return new Intl.NumberFormat(`en`, {
      style: "currency",
      currency: currency, // "INR", "USD", etc.
    })
      .format(0)
      .replace(/0.00/g, "")
      .trim();
  }

  return (
    <Link
      to={`/seller/product/${data._id}`}
      className="bg-[#cc80ff] flex flex-col gap-2 rounded overflow-hidden "
    >
      <div className="">
        <img
          src={data.images[0].url}
          alt=""
          className="w-[20rem] h-[25rem] object-cover object-center "
        />
      </div>
      <div className="px-2 pb-2 ">
        <h1>{data.title}</h1>

        <h2 className="flex gap-1">
          <span>{setCurrency(data.price.currency)}</span>
          <span>{formatPrice(data.price.amount)}</span>
          <span>{data.price.currency}</span>
        </h2>
      </div>
    </Link>
  );
}

const Dashbord = () => {
  const { handleGetSellerProducts } = useProduct();
  const sellerProduct = useSelector((state) => state.product.sellerProducts);
  const loading = useSelector((state) => state.product.loading);
  const errror = useSelector((state) => state.product.error);

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  if (loading) {
    return (
      <main className="w-full h-screen flex items-center justify-center ">
        <h1 className="text-[10rem] text-[red] text-center ">Loading...</h1>
      </main>
    );
  }

  return (
    <div className="w-full min-h-screen  flex flex-wrap justify-center gap-1 px-4 py-2 bg-[black] ">
      {sellerProduct ? (
        sellerProduct.map((item) => (
          <div key={item._id} className="shrink-0">
            <ProductCard data={item} />
          </div>
        ))
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};

export default Dashbord;
