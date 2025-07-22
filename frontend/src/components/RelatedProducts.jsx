import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const filtered = products.filter(
        (item) => item.category === category && item.subCategory === subCategory
      );
      setRelated(filtered.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="py-10">
      <div className="mb-6">
        <Title text1="Related" text2="Products" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={
              Array.isArray(item.images) && item.images.length > 0
                ? item.images[0]
                : '/images/fallback.png'
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
