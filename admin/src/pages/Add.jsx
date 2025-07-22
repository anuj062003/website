import React from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = React.useState(false);
  const [image2, setImage2] = React.useState(false);
  const [image3, setImage3] = React.useState(false);
  const [image4, setImage4] = React.useState(false);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('Men');
  const [subCategory, setSubCategory] = React.useState('Topwear');
  const [bestseller, setBestseller] = React.useState(false);
  const [sizes, setSizes] = React.useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', String(bestseller));
      formData.append('sizes', JSON.stringify(sizes));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(
        backendUrl + '/api/product/add',
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setCategory('Men');
        setSubCategory('Topwear');
        setBestseller(false);
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          {[image1, image2, image3, image4].map((img, i) => (
            <label key={i} htmlFor={`image${i + 1}`}>
              <img className='w-20' src={!img ? assets.upload_area : URL.createObjectURL(img)} alt='' />
              <input
                onChange={(e) => {
                  const setter = [setImage1, setImage2, setImage3, setImage4][i];
                  setter(e.target.files[0]);
                }}
                type='file'
                id={`image${i + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full max-w-[500px] px-3 py-2'
          type='text'
          placeholder='Type here'
          required
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full max-w-[500px] px-3 py-2'
          placeholder='Write content here'
          required
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value='Men'>Men</option>
            <option value='Women'>Women</option>
            <option value='Kids'>Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Sub Category</p>
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value='Topwear'>Topwear</option>
            <option value='Bottomwear'>Bottomwear</option>
            <option value='Winterwear'>Winterwear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product price</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='w-full px-3 py-2 sm:w-[120px]'
            type='number'
            placeholder='25'
          />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input
          type='checkbox'
          id='bestseller'
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <label className='cursor-pointer' htmlFor='bestseller'>
          Add to bestseller
        </label>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>
        ADD
      </button>
    </form>
  );
};

export default Add;
