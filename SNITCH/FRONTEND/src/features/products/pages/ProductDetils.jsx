// import React, { useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router";
// import { useProduct } from "../hooks/product.hook";

// const ProductDetails = () => {
//   const { handleGetProductDetilsById } = useProduct();
//   const { productId } = useParams();

//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedAttributes, setSelectedAttributes] = useState({});

//   // 🔹 Fetch product
//   useEffect(() => {
//     async function getProductDetails() {
//       try {
//         const data = await handleGetProductDetilsById(productId);
//         setProduct(data);
//       } catch (error) {
//         console.error("Failed to fetch product details", error);
//       }
//     }
//     getProductDetails();
//   }, [productId]);

//   // 🔹 Set default attributes
//   useEffect(() => {
//     if (product?.variants?.length > 0) {
//       setSelectedAttributes(product.variants[0].attributes || {});
//     } else {
//       setSelectedAttributes({});
//     }
//   }, [product]); // ✅ FIXED (was productId)

//   // 🔹 Format price
//   function formatPrice(value, currency) {
//     if (!value || !currency) return "";
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency,
//     }).format(value);
//   }

//   // 🔹 Active variant
//   const activeVariant = useMemo(() => {
//     if (!product?.variants?.length) return null;

//     return product.variants.find((v) => {
//       const vAttrs = v.attributes || {};
//       const keys = Object.keys(selectedAttributes);

//       return (
//         keys.length === Object.keys(vAttrs).length &&
//         keys.every((key) => vAttrs[key] === selectedAttributes[key])
//       );
//     });
//   }, [product, selectedAttributes]);

//   // 🔹 Available attributes
//   const availableAttributes = useMemo(() => {
//     if (!product?.variants) return {};

//     const attrs = {};
//     product.variants.forEach((variant) => {
//       Object.entries(variant.attributes || {}).forEach(([key, value]) => {
//         if (!attrs[key]) attrs[key] = new Set();
//         attrs[key].add(value);
//       });
//     });

//     Object.keys(attrs).forEach((key) => {
//       attrs[key] = Array.from(attrs[key]);
//     });

//     return attrs;
//   }, [product]);

//   // 🔹 Merge ALL images (product + all variants)
//   const displayImages = useMemo(() => {
//     const productImages = product?.images || [];

//     const variantImages =
//       product?.variants?.flatMap((v) => v.images || []) || [];

//     const allImages = [...productImages, ...variantImages];

//     // remove duplicates by URL
//     const uniqueImages = Array.from(
//       new Map(allImages.map((img) => [img.url, img])).values()
//     );

//     return uniqueImages.length > 0
//       ? uniqueImages
//       : [{ url: "https://via.placeholder.com/500x700?text=No+Image" }];
//   }, [product]);

//   const safeImage = displayImages[selectedImage] || displayImages[0];

//   const displayPrice = activeVariant?.price || product?.price;

//   // 🔹 Reset image on variant change
//   useEffect(() => {
//     setSelectedImage(0);
//   }, [activeVariant]);

//   // 🔹 Auto focus variant image
//   useEffect(() => {
//     if (activeVariant?.images?.length > 0) {
//       const first = activeVariant.images[0];

//       const index = displayImages.findIndex(
//         (img) => img.url === first.url
//       );

//       if (index !== -1) setSelectedImage(index);
//     }
//   }, [activeVariant, displayImages]);

//   // 🔹 Attribute change
//   const handleAttributeChange = (attrName, value) => {
//     setSelectedAttributes((prev) => ({
//       ...prev,
//       [attrName]: value,
//     }));
//   };

//   // 🔹 Loading UI AFTER hooks
//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="animate-pulse">Loading product...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full bg-[#F9F2EE] px-4 py-6">
//       <div className="flex justify-center gap-8">

//         {/* LEFT */}
//         <div className="w-[20rem]">
//           <h1 className="text-3xl mb-4">{product.title}</h1>

//           <h2 className="text-xl">
//             {formatPrice(displayPrice?.amount, displayPrice?.currency)}
//           </h2>

//           <hr className="my-6" />
//           <p>{product.description}</p>
//         </div>

//         {/* IMAGE */}
//         <div className="flex flex-col items-center gap-2">
//           <img
//             src={safeImage?.url}
//             alt=""
//             className="w-[28rem] aspect-[4/5] object-cover rounded"
//           />
//         </div>

//         {/* RIGHT */}
//         <div className="w-[20rem] text-right">

//           {/* ATTRIBUTES */}
//           {Object.entries(availableAttributes).map(([attrName, values]) => (
//             <div key={attrName} className="mb-4">
//               <h3 className="uppercase">{attrName}</h3>

//               <div className="flex flex-wrap gap-2 justify-end">
//                 {values.map((val) => {
//                   const isSelected = selectedAttributes[attrName] === val;

//                   return (
//                     <button
//                       key={val}
//                       onClick={() => handleAttributeChange(attrName, val)}
//                       className={`px-3 py-1 border rounded ${
//                         isSelected
//                           ? "bg-black text-white"
//                           : "bg-gray-200"
//                       }`}
//                     >
//                       {val}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}

//           {/* VARIANT DETAILS */}
//           {activeVariant && (
//             <div className="mb-4 border p-3 rounded bg-white">
//               <h3 className="text-sm font-semibold mb-2">
//                 Variant Details
//               </h3>

//               {Object.entries(activeVariant.attributes || {}).map(
//                 ([key, value]) => (
//                   <p key={key}>
//                     <span className="font-medium">{key}:</span> {value}
//                   </p>
//                 )
//               )}

//               <p
//                 className={`text-sm ${
//                   activeVariant.stock > 0
//                     ? "text-green-600"
//                     : "text-red-500"
//                 }`}
//               >
//                 {activeVariant.stock > 0
//                   ? `${activeVariant.stock} in stock`
//                   : "Out of stock"}
//               </p>
//             </div>
//           )}

//         </div>
//       </div>

//       {/* THUMBNAILS */}
//       <div className="flex justify-center gap-2 mt-6">
//         {displayImages.map((img, index) => (
//           <img
//             key={index}
//             src={img.url}
//             onClick={() => setSelectedImage(index)}
//             className={`w-[6rem] aspect-[4/6] object-cover cursor-pointer rounded ${
//               selectedImage === index ? "ring-2 ring-black" : ""
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

// ---------------------------

import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useProduct } from "../hooks/useProduct.hook";
import { useCart } from "../../cart/hooks/useCart.hook";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const navigate = useNavigate();
  const { handleGetProductDetilsById } = useProduct();
  const { handleAddItem } = useCart();



  async function fetchProductDetails() {
    try {
      const data = await handleGetProductDetilsById(productId);
      // Handle both cases depending on how API is structured
      setProduct(data?.product || data);
    } catch (error) {
      console.error("Failed to fetch product details", error);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedAttributes(product.variants[0].attributes || {});
    }
  }, [product]);

  const activeVariant = useMemo(() => {
    if (!product?.variants || product.variants.length === 0) return null;
    return product.variants.find((v) => {
      if (!v.attributes) return false;
      const vKeys = Object.keys(v.attributes);
      const sKeys = Object.keys(selectedAttributes);
      const isMatch = vKeys.every(
        (k) => v.attributes[k] === selectedAttributes[k],
      );
      // If they don't have exactly the same keys, they shouldn't perfectly match,
      // but we might only care about matching what's available.
      return vKeys.length === sKeys.length && isMatch;
    });
  }, [product, selectedAttributes]);

  console.log({ product, activeVariant });

  const availableAttributes = useMemo(() => {
    if (!product?.variants) return {};
    const attrs = {};
    product.variants.forEach((variant) => {
      if (variant.attributes) {
        Object.entries(variant.attributes).forEach(([key, value]) => {
          if (!attrs[key]) attrs[key] = new Set();
          attrs[key].add(value);
        });
      }
    });
    Object.keys(attrs).forEach((key) => {
      attrs[key] = Array.from(attrs[key]);
    });
    return attrs;
  }, [product]);

  useEffect(() => {
    setSelectedImage(0);
  }, [activeVariant]);

  const handleAttributeChange = (attrName, value) => {
    const newAttrs = { ...selectedAttributes, [attrName]: value };

    // Find if an exact match exists for this combination
    const exactMatch = product.variants.find((v) => {
      const vAttrs = v.attributes || {};
      return (
        Object.keys(newAttrs).every((k) => newAttrs[k] === vAttrs[k]) &&
        Object.keys(vAttrs).every((k) => newAttrs[k] === vAttrs[k])
      );
    });

    if (exactMatch) {
      setSelectedAttributes(exactMatch.attributes);
    } else {
      // Find any variant that has this newly selected attribute to fallback nicely
      const fallbackVariant = product.variants.find(
        (v) => v.attributes && v.attributes[attrName] === value,
      );
      if (fallbackVariant) {
        setSelectedAttributes(fallbackVariant.attributes);
      } else {
        setSelectedAttributes(newAttrs);
      }
    }
  };

  if (!product) {
    return (
      <div
        className="min-h-screen flex items-center justify-center selection:bg-[#C9A96E]/30"
        style={{ backgroundColor: "#fbf9f6" }}
      >
        <p
          style={{ fontFamily: "'Inter', sans-serif", color: "#B5ADA3" }}
          className="text-[10px] uppercase tracking-[0.2em] font-medium animate-pulse"
        >
          Retrieving piece...
        </p>
      </div>
    );
  }

  console.log(product);

  // Fallbacks
  const displayImages =
    activeVariant?.images && activeVariant.images.length > 0
      ? activeVariant.images
      : product.images && product.images.length > 0
        ? product.images
        : [{ url: "/snitch_editorial_warm.png" }];

  const displayPrice = activeVariant?.price?.amount
    ? activeVariant.price
    : product.price;

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen selection:bg-[#C9A96E]/30 pb-24"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 pt-12 lg:pt-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            {/* ── LEFT: Image Gallery ── */}
            <div className="w-full lg:w-[70%] flex flex-col-reverse md:flex-row gap-4 lg:gap-6">
              {/* Thumbnails (Vertical on Desktop, Horizontal on Mobile) */}
              {displayImages.length > 1 && (
                <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-20 lg:w-24 flex-shrink-0 md:max-h-[calc(100vh-200px)]">
                  {displayImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-20 md:w-full aspect-[4/5] overflow-hidden transition-all duration-300 ${selectedImage === idx ? "opacity-100 ring-1 ring-[#C9A96E] ring-offset-2" : "opacity-50 hover:opacity-100"}`}
                      style={{
                        backgroundColor: "#f5f3f0",
                        "--tw-ring-offset-color": "#fbf9f6",
                      }}
                    >
                      <img
                        src={img.url}
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div
                className="relative w-full aspect-4/5 overflow-hidden group"
                style={{ backgroundColor: "#f5f3f0" }}
              >
                <img
                  src={
                    displayImages[selectedImage]?.url || displayImages[0].url
                  }
                  alt={product.title}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                {displayImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === 0 ? displayImages.length - 1 : prev - 1,
                        )
                      }
                      className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border"
                      style={{
                        backgroundColor: "rgba(251,249,246,0.8)",
                        borderColor: "#e4e2df",
                        color: "#1b1c1a",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fbf9f6")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(251,249,246,0.8)")
                      }
                      aria-label="Previous image"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === displayImages.length - 1 ? 0 : prev + 1,
                        )
                      }
                      className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border"
                      style={{
                        backgroundColor: "rgba(251,249,246,0.8)",
                        borderColor: "#e4e2df",
                        color: "#1b1c1a",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fbf9f6")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(251,249,246,0.8)")
                      }
                      aria-label="Next image"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* ── RIGHT: Product Details ── */}
            <div className="w-full lg:w-[30%] lg:sticky lg:top-24 flex flex-col pt-4">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#1b1c1a",
                }}
              >
                {product.title}
              </h1>

              <div className="mb-8">
                <span
                  className="text-sm uppercase tracking-[0.2em] font-medium"
                  style={{ color: "#1b1c1a" }}
                >
                  {displayPrice?.currency}{" "}
                  {displayPrice?.amount?.toLocaleString()}
                </span>
              </div>

              <div
                className="h-px w-full mb-8"
                style={{ backgroundColor: "#e4e2df" }}
              />

              {/* Options/Variants */}
              {Object.entries(availableAttributes).map(([attrName, values]) => (
                <div key={attrName} className="mb-6">
                  <h3
                    className="text-[10px] uppercase tracking-[0.24em] font-medium mb-3"
                    style={{ color: "#C9A96E" }}
                  >
                    {attrName}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {values.map((val) => {
                      const isSelected = selectedAttributes[attrName] === val;
                      return (
                        <button
                          key={val}
                          onClick={() => handleAttributeChange(attrName, val)}
                          className={`px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-300 border ${isSelected ? "border-[#1b1c1a] bg-[#1b1c1a] text-[#fbf9f6]" : "border-[#d0c5b5] text-[#1b1c1a] hover:border-[#1b1c1a]"}`}
                          style={
                            isSelected ? {} : { backgroundColor: "transparent" }
                          }
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Stock Information */}
              {activeVariant && activeVariant.stock !== undefined && (
                <div className="mb-6">
                  <span
                    className={`text-[10px] uppercase tracking-[0.2em] font-medium ${activeVariant.stock > 0 ? "text-green-700" : "text-red-700"}`}
                  >
                    {activeVariant.stock > 0
                      ? `${activeVariant.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>
              )}

              <div className="mb-12">
                <h3
                  className="text-[10px] uppercase tracking-[0.24em] font-medium mb-4"
                  style={{ color: "#C9A96E" }}
                >
                  The Details
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#7A6E63" }}
                >
                  {product.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 mt-auto">
                <button
                  className="w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300"
                  style={{
                    backgroundColor: "#1b1c1a",
                    color: "#fbf9f6",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#C9A96E";
                    e.currentTarget.style.color = "#1b1c1a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#1b1c1a";
                    e.currentTarget.style.color = "#fbf9f6";
                  }}
                  onClick={() => {
                    handleAddItem({
                      productId: product._id,
                      variantId: activeVariant._id,
                    });
                  }}
                >
                  Add to Cart
                </button>

                <button
                  className="w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 border"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "#d0c5b5",
                    color: "#1b1c1a",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#C9A96E";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#d0c5b5";
                  }}
                >
                  Buy Now
                </button>
              </div>

              {/* Extra elegant details */}
              <div
                className="mt-14 space-y-4 text-[10px] uppercase tracking-[0.1em]"
                style={{ color: "#B5ADA3" }}
              >
                <div
                  className="flex justify-between border-b pb-3"
                  style={{ borderColor: "#e4e2df" }}
                >
                  <span>Shipping</span>
                  <span>Complimentary over INR 15,000</span>
                </div>
                <div
                  className="flex justify-between border-b pb-3"
                  style={{ borderColor: "#e4e2df" }}
                >
                  <span>Returns</span>
                  <span>Within 14 days of delivery</span>
                </div>
                <div
                  className="flex justify-between border-b pb-3"
                  style={{ borderColor: "#e4e2df" }}
                >
                  <span>Authenticity</span>
                  <span>100% Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
