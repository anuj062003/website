import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  // Safe fallback image resolution
  let displayImage = '/images/fallback.png';
  if (Array.isArray(image) && image.length > 0 && typeof image[0] === 'string') {
    displayImage = image[0];
  } else if (typeof image === 'string' && image.trim() !== '') {
    displayImage = image;
  }

  return (
    <Link
      to={`/product/${id}`}
      className="text-gray-700 cursor-pointer block hover:shadow-lg transition-shadow rounded-lg p-2"
    >
      <div className="overflow-hidden rounded-md aspect-[3/4] bg-gray-100">
        <img
          src={displayImage}
          alt={name || 'Product'}
          className="hover:scale-110 transition-transform duration-300 ease-in-out w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/fallback.png';
          }}
        />
      </div>
      <p className="pt-3 pb-1 text-sm font-medium truncate" title={name}>
        {name || 'Unnamed Product'}
      </p>
      <p className="text-sm font-semibold text-gray-800">
        {currency} {price}
      </p>
    </Link>
  );
};

export default ProductItem;
