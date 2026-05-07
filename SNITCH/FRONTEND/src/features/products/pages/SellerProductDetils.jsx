import React, { useEffect, useState } from "react";
import { useProduct } from "../hooks/useProduct.hook";
import { Link, useParams } from "react-router";

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const SellerProductDetils = () => {
  const { handleGetProductDetilsById, handleAddProductVariant } = useProduct();
  const { productId } = useParams();
  // console.log(productId);

  const [product, setProduct] = useState(null);
  const [localVariants, setLocalVariants] = useState([]);
  const [isAddingVariant, setIsAddingVariant] = useState(false);
  const [loading, setLoading] = useState(true);

  // UI state for inputs to maintain focus
  const [attributeInputs, setAttributeInputs] = useState([
    { key: "", value: "" },
  ]);

  // New variant state
  const [newVariant, setNewVariant] = useState({
    images: [],
    stock: 0,
    attributes: {}, // Strictly an object
    price: { amount: "", currency: "INR" },
  });

  async function fetchProductDetails() {
    setLoading(true);
    try {
      const data = await handleGetProductDetilsById(productId);
      // console.log(data);
      const prod = data?.product || data;
      setProduct(prod);
      // Initialize variants locally
      if (prod?.variants) {
        setLocalVariants(prod.variants);
      }
    } catch (error) {
      console.error("Failed to fetch product details", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  // Handlers for modifying existing variant stock natively
  const handleStockChange = (index, newStock) => {
    const updatedVariants = [...localVariants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      stock: Number(newStock),
    };
    setLocalVariants(updatedVariants);
  };

  // Handlers for New Variant Form
  const handleAddNewVariant = async () => {
    // Validate required at least one attribute to be filled
    const hasValidAttribute = attributeInputs.some(
      (attr) => attr.key.trim() && attr.value.trim(),
    );
    if (!hasValidAttribute) {
      alert("At least one valid attribute is required.");
      return;
    }

    // Maps preview URL so the variant list can display the image locally
    const cleanImages = newVariant.images.map((img) => ({
      url: img.previewUrl,
      file: img.file,
    }));

    // Attributes is already an object in newVariant, just use it safely
    const cleanAttributes = { ...newVariant.attributes };

    const variantToSave = {
      images: cleanImages,
      stock: Number(newVariant.stock),
      attributes: cleanAttributes,
      price: newVariant.price.amount
        ? Number(newVariant.price.amount)
        : undefined, // price is optional
    };

    setLocalVariants([...localVariants, variantToSave]);
    setIsAddingVariant(false);

    await handleAddProductVariant(productId, variantToSave);

    // Reset form
    // Note: should ideally revoke old object URLs as well to prevent memory leaks if it were a long-lived SPA
    setAttributeInputs([{ key: "", value: "" }]);
    setNewVariant({
      images: [],
      stock: 0,
      attributes: {},
      price: { amount: "", currency: "INR" },
    });
  };

  const handleAddAttribute = () => {
    setAttributeInputs((prev) => [...prev, { key: "", value: "" }]);
  };

  const handleAttributeChange = (index, field, value) => {
    const updatedInputs = [...attributeInputs];
    updatedInputs[index][field] = value;
    setAttributeInputs(updatedInputs);

    // Synchronize to object format
    const newAttrsObj = {};
    updatedInputs.forEach((attr) => {
      if (attr.key.trim() !== "") {
        newAttrsObj[attr.key.trim()] = attr.value;
      }
    });
    setNewVariant((prev) => ({ ...prev, attributes: newAttrsObj }));
  };

  const handleRemoveAttribute = (index) => {
    const updatedInputs = attributeInputs.filter((_, i) => i !== index);
    setAttributeInputs(updatedInputs);

    // Synchronize to object format
    const newAttrsObj = {};
    updatedInputs.forEach((attr) => {
      if (attr.key.trim() !== "") {
        newAttrsObj[attr.key.trim()] = attr.value;
      }
    });
    setNewVariant((prev) => ({ ...prev, attributes: newAttrsObj }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const availableSlots = 7 - newVariant.images.length;
    const filesToAdd = files.slice(0, availableSlots);

    if (files.length > availableSlots) {
      alert(`You can only upload up to 7 images. ${filesToAdd.length} added.`);
    }

    const newImageObjects = filesToAdd.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setNewVariant((prev) => ({
      ...prev,
      images: [...prev.images, ...newImageObjects],
    }));

    // Clear the input so identical files can be selected again if needed
    e.target.value = "";
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = newVariant.images[index];
    if (imageToRemove?.previewUrl) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }
    const updatedImages = newVariant.images.filter((_, i) => i !== index);
    setNewVariant((prev) => ({ ...prev, images: updatedImages }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center text-[#1b1c1a] font-serif">
        Loading gallery...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center text-[#1b1c1a] font-serif">
        Product Not Found
      </div>
    );
  }
  // console.log(newVariant?.images[0]?.name);
  // console.log(product);
  return (
    <div className="w-full bg-[#F9F2EE] px-4 py-2 ">
      <Link to={-1} className="text-[1.5rem] hover:text-[red] ">
            Back
          </Link>
      <div className="w-full flex justify-center gap-4 ">
        <div className="w-[20rem] ">
          <div className="flex flex-col gap-4 ">
            <h1 className="text-[3rem] leading-10 ">{product?.title}</h1>
            <h2 className="text-[2rem] ">
              {/* {product &&
                formatPrice(product?.price?.amount, product?.price?.currency)} */}
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
            src={product.images[0]?.url}
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
                onClick={() => setSelectedImageId(img._id)}
                className="w-[10rem] aspect-4/6 object-cover object-center rounded-[5px] cursor-pointer "
              />
            ))}
        </div>
      </div>

      {/* add verients */}
      <div className=" ">
        <section className="bg-[#f5f3f0] p-6 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <h3 className="font-serif text-3xl uppercase">
              Variants & Inventory
            </h3>
            {!isAddingVariant && (
              <button
                onClick={() => setIsAddingVariant(true)}
                className="bg-[#745a27] text-[#ffffff] px-6 py-3 uppercase tracking-wider text-sm hover:bg-[#5a4312] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <PlusIcon /> Add New Variant
              </button>
            )}
          </div>

          {/* Add New Variant Form */}
          {isAddingVariant && (
            <div className="bg-[#ffffff] p-6 md:p-8 mb-12 shadow-[0_20px_40px_rgba(27,28,26,0.04)]">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-serif text-xl uppercase">Create Variant</h4>
                <button
                  onClick={() => setIsAddingVariant(false)}
                  className="text-[#7f7668] hover:text-[#1b1c1a] text-sm uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Left Col: Attributes & Basics */}
                <div className="space-y-6">
                  {/* Dynamic Attributes */}
                  <div>
                    <label className="block text-sm uppercase tracking-wider text-[#6e6258] mb-3">
                      Attributes (e.g. Size, Color) *
                    </label>
                    <div className="space-y-3">
                      {attributeInputs.map((attr, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder="Key (e.g., Size)"
                            value={attr.key}
                            onChange={(e) =>
                              handleAttributeChange(
                                index,
                                "key",
                                e.target.value,
                              )
                            }
                            className="w-1/2 bg-transparent border-b border-[#d0c5b5] py-2 focus:outline-none focus:border-[#745a27] placeholder:text-[#d0c5b5]"
                          />
                          <input
                            type="text"
                            placeholder="Value (e.g., M)"
                            value={attr.value}
                            onChange={(e) =>
                              handleAttributeChange(
                                index,
                                "value",
                                e.target.value,
                              )
                            }
                            className="w-1/2 bg-transparent border-b border-[#d0c5b5] py-2 focus:outline-none focus:border-[#745a27] placeholder:text-[#d0c5b5]"
                          />
                          {attributeInputs.length > 1 && (
                            <button
                              onClick={() => handleRemoveAttribute(index)}
                              className="text-[#ba1a1a] p-2 hover:bg-[#ffdad6] transition-colors cursor-pointer"
                            >
                              <TrashIcon />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleAddAttribute}
                      className="mt-3 text-[#745a27] text-sm uppercase tracking-wider flex items-center gap-1 hover:text-[#5a4312] cursor-pointer"
                    >
                      <PlusIcon /> Add Attribute
                    </button>
                  </div>

                  {/* Stock & Price */}
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-sm uppercase tracking-wider text-[#6e6258] mb-2">
                        Initial Stock
                      </label>
                      <input
                        type="number"
                        value={newVariant.stock}
                        onChange={(e) =>
                          setNewVariant({
                            ...newVariant,
                            stock: e.target.value,
                          })
                        }
                        className="w-full bg-transparent border-b border-[#d0c5b5] py-2 focus:outline-none focus:border-[#745a27]"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm uppercase tracking-wider text-[#6e6258] mb-2">
                        Price Amount (Optional)
                      </label>
                      <input
                        type="number"
                        value={newVariant.price.amount}
                        onChange={(e) =>
                          setNewVariant({
                            ...newVariant,
                            price: {
                              ...newVariant.price,
                              amount: e.target.value,
                            },
                          })
                        }
                        placeholder="Default if empty"
                        className="w-full bg-transparent border-b border-[#d0c5b5] py-2 focus:outline-none focus:border-[#745a27] placeholder:text-[#d0c5b5]"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Right Col: Images */}
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <label className="block text-sm uppercase tracking-wider text-[#6e6258]">
                      Image Upload (Max 7, Optional)
                    </label>
                    <span className="text-xs text-[#7f7668]">
                      {newVariant.images.length}/7
                    </span>
                  </div>

                  {newVariant.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {newVariant.images.map((img, index) => (
                        <div
                          key={index}
                          className="relative aspect-[4/5] bg-[#f5f3f0]"
                        >
                          <img
                            src={img.previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-white/80 p-1 text-[#ba1a1a] hover:bg-white transition-colors cursor-pointer"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {newVariant.images.length < 7 && (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="block w-full text-sm text-[#6e6258]
                          file:mr-4 file:py-2 file:px-4
                          file:border-0 file:bg-[#f5f3f0] file:text-[#1b1c1a]
                          hover:file:bg-[#e4e2df] file:cursor-pointer file:uppercase file:text-xs file:tracking-wider file:font-serif
                          cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  onClick={handleAddNewVariant}
                  className="bg-gradient-to-r from-[#745a27] to-[#c9a96e] text-[#ffffff] px-8 py-3 uppercase tracking-wider text-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Save Variant
                </button>
              </div>
            </div>
          )}

          {/* Variants List */}
          {localVariants.length === 0 ? (
            <div className="py-12 text-center text-[#6e6258]">
              <p>No variants have been created yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {localVariants.map((variant, idx) => (
                <div
                  key={idx}
                  className="bg-[#ffffff] flex flex-col pt-4 shadow-[0_20px_40px_rgba(27,28,26,0.02)]"
                >
                  <div className="px-6 flex gap-4 h-24 mb-4">
                    {/* Variant Thumb */}
                    <div className="w-16 h-20 bg-[#f5f3f0] shrink-0">
                      {variant.images && variant.images.length > 0 ? (
                        <img
                          src={variant.images[0].url}
                          alt="Variant"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-[#7f7668]">
                          N/A
                        </div>
                      )}
                    </div>
                    {/* Attributes */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {Object.entries(variant.attributes || {}).map(
                          ([key, val]) => (
                            <span
                              key={key}
                              className="bg-[#f5f3f0] px-2 py-1 text-xs uppercase tracking-wider text-[#4d463a]"
                            >
                              <span className="text-[#a8a094]">{key}:</span>{" "}
                              {val}
                            </span>
                          ),
                        )}
                      </div>
                      <div className="text-sm font-light">
                        {variant.price?.amount
                          ? `${variant.price.amount} ${variant.price.currency}`
                          : "Base Price"}
                      </div>
                    </div>
                  </div>

                  {/* Stock Management Row */}
                  <div className="mt-auto border-t border-[#f5f3f0] bg-[#fbf9f6] flex items-center px-6 py-3 justify-between">
                    <label className="text-sm text-[#6e6258] uppercase tracking-wider">
                      Current Stock
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={variant.stock || 0}
                        onChange={(e) => handleStockChange(idx, e.target.value)}
                        className="w-20 bg-transparent border-b border-[#d0c5b5] py-1 text-right focus:outline-none focus:border-[#745a27] font-serif text-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SellerProductDetils;
