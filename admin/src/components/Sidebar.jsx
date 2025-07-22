import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const linkClasses =
    'flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-colors duration-200 hover:bg-gray-100';

  const activeLinkClasses = 'bg-blue-100 font-semibold text-blue-600';

  return (
    <div className='w-[18%] min-h-screen border-r-2 bg-white'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink
          to='/add'
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeLinkClasses : ''}`
          }
        >
          <img className='w-5 h-5' src={assets.add_icon} alt='Add Icon' />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink
          to='/list'
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeLinkClasses : ''}`
          }
        >
          <img className='w-5 h-5' src={assets.order_icon} alt='List Icon' />
          <p className='hidden md:block'>List Items</p>
        </NavLink>

        <NavLink
          to='/orders'
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeLinkClasses : ''}`
          }
        >
          <img className='w-5 h-5' src={assets.order_icon} alt='Orders Icon' />
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
