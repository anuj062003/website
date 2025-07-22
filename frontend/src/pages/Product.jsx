import React, { useEffect, useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    if (!Array.isArray(products) || products.length === 0) return;

    const item = products.find((item) => item._id == productId); // loose equality for id match
    if (item) {
      setProductData(item);
      if (Array.isArray(item.images) && item.images.length > 0) {
        setImage(item.images[0]); // ✅ FIX: use first image
      } else {
        setImage(''); // fallback if no image
      }
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!productData) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {Array.isArray(productData.images) &&
              productData.images.map((img, index) => (
                <img
                  onClick={() => setImage(img)}
                  src={img}
                  key={index}
                  alt={`thumbnail-${index}`}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                />
              ))}
          </div>
          <div className="w-full sm:w-[80%]">
            {image ? (
              <img src={image} className="w-full h-auto object-contain" alt="Product" />
            ) : (
              <div className="text-center text-gray-400">No image available</div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star" className="w-3.5" />
            <img src={assets.star_icon} alt="star" className="w-3.5" />
            <img src={assets.star_icon} alt="star" className="w-3.5" />
            <img src={assets.star_icon} alt="star" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="star dull" className="w-3.5" />
            <p>(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          {/* Sizes */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {Array.isArray(productData.sizes) &&
                productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      item === size ? 'border-orange-500' : ''
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Discover the latest trends in fashion, electronics, and home essentials at unbeatable prices.
            Enjoy fast shipping, secure checkout, and 24/7 customer support for a seamless shopping experience.
            Shop now and elevate your lifestyle with our top-rated products and exclusive deals!
          </p>
          <p>
            Explore a wide range of premium products tailored to your needs, all in one place.
            Experience hassle-free shopping with easy returns, multiple payment options, and lightning-fast delivery.
            Join thousands of happy customers and make every purchase count on our trusted eCommerce platform.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
