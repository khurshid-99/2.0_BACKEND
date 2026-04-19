import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useProduct } from "../hooks/product.hook";

const ProductDetils = () => {
  const { handleGetProductDetilsById } = useProduct();

  const { id } = useParams();
  //   console.log(id);

  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(0);
  const [selectedImageId, setSelectedImageId] = useState(null);

  async function getProductDetil() {
    const product = await handleGetProductDetilsById({ productId: id });
    setProduct(product);
  }

  function formatPrice(value, currency) {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: currency, // "INR", "USD", etc.
      minimumFractionDigits: 2,
    }).format(value);
  }

  function handleSetImage(id) {
    // console.log(id);
    setImage(id);
  }

  useEffect(() => {
    getProductDetil();

    if (product?.images?.length) {
      setSelectedImageId(product.images[0]._id);
    }
  }, [id]);
  // console.log(product)
  return (
    <div className="w-full bg-[#F9F2EE] px-4 py-2 ">
      <div className="w-full flex justify-center gap-4 ">
        <div className="w-[20rem] ">
          <div className="flex flex-col gap-4 ">
            <h1 className="text-[3rem] leading-10 ">{product?.title}</h1>
            <h2 className="text-[2rem] ">
              {product &&
                formatPrice(product?.price?.amount, product?.price?.currency)}
            </h2>
          </div>
          <div className="w-[80%] h-[1px] bg-[red] my-[2rem] " />
          <div>
            <h2 className="text-[1.5rem] ">Description</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ullam dolor numquam in aliquid adipisci beatae ipsa voluptate
              veniam natus, odit culpa et rerum facilis, quam sed, voluptatum
              dicta reiciendis?
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <img
            src={product?.images[image].url}
            alt=""
            className="w-[30rem] aspect-4/5 object-cover object-center rounded-[10px] "
          />
          <div>
            <p className="uppercase text-center  ">designed in india</p>
            <p className="uppercase text-center ">Fabric and stitched</p>
          </div>
        </div>
        <div className="text-end w-[20rem] ">
          <div className="pb-4 ">
            <h1 className="text-[2rem] uppercase ">Size</h1>
            <div className="flex gap-2 justify-end ">
              <button className="flex items-center justify-center aspect-square w-[3rem] rounded-full bg-[#E6DFD8] p-3 ">
                xll
              </button>

              <button className="flex items-center justify-center aspect-square w-[3rem] rounded-full bg-[#E6DFD8] p-3 ">
                xll
              </button>

              <button className="flex items-center justify-center aspect-square w-[3rem] rounded-full bg-[#E6DFD8] p-3 ">
                xll
              </button>
              <button className="flex items-center justify-center aspect-square w-[3rem] rounded-full bg-[#E6DFD8] p-3 ">
                xll
              </button>
            </div>
          </div>
          <div className="pb-4  ">
            <h1 className="uppercase text-[2rem] pb-2 ">Color</h1>
            <div className="flex flex-wrap gap-1 justify-end ">
              <div className="w-[4rem] aspect-2/3 bg-[red] rounded-[5px] p-2 ">
                color
              </div>
              <div className="w-[4rem] aspect-2/3 bg-[red] rounded-[5px] p-2 ">
                color
              </div>
              <div className="w-[4rem] aspect-2/3 bg-[red] rounded-[5px] p-2 ">
                color
              </div>
              <div className="w-[4rem] aspect-2/3 bg-[red] rounded-[5px] p-2 ">
                color
              </div>
              <div className="w-[4rem] aspect-2/3 bg-[red] rounded-[5px] p-2 ">
                color
              </div>
              <div className="w-[4rem] aspect-2/3 bg-[red] rounded-[5px] p-2 ">
                color
              </div>
            </div>
          </div>
          <div className="pb-4 flex flex-col gap-2 items-end ">
            <button className="w-[10rem] text-[1.1rem] uppercase px-5 py-2 text-[#F9F2EE] bg-[#ff9346] rounded-full text-nowrap ">
              Add to Card
            </button>
            <button className="w-[10rem] border duration-300 text-[1.1rem] uppercase px-5 py-2 hover:text-[#F9F2EE] hover:bg-[#ff9346] rounded-full ">
              Buy now
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="w-full flex gap-2 justify-center">
          {product &&
            product.images.map((img, index) => (
              <img
                key={img._id}
                src={img.url}
                alt=""
                onClick={() => handleSetImage(index)}
                className="w-[10rem] aspect-4/6 object-cover object-center rounded-[5px] cursor-pointer "
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetils;
