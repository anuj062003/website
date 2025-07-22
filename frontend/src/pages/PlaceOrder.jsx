import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('cod');
  const [razorpayReady, setRazorpayReady] = useState(false);

  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayReady(true);
    script.onerror = () => toast.error('Failed to load Razorpay SDK');
    document.body.appendChild(script);
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const initPay = (order) => {
    if (!window.Razorpay || !razorpayReady) {
      toast.error('Razorpay SDK not loaded.');
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || '',
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + '/api/order/verifyRazorpay',
            response,
            { headers: { token } }
          );
          if (data.success) {
            toast.success('Payment successful!');
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(data.message || 'Payment failed');
          }
        } catch (err) {
          toast.error('Payment verification failed.');
        }
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: '#000000',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const product = products.find((p) => p._id === itemId);
            if (product) {
              orderItems.push({
                ...product,
                size,
                quantity: cartItems[itemId][size],
              });
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
      };

      if (method === 'cod') {
        const res = await axios.post(`${backendUrl}/api/order/place`, orderData, {
          headers: { token },
        });

        if (res.data.success) {
          setCartItems({});
          navigate('/orders');
        } else {
          toast.error(res.data.message);
        }
      } else if (method === 'stripe') {
        const res = await axios.post(`${backendUrl}/api/order/stripe`, orderData, {
          headers: { token },
        });

        if (res.data.success) {
          window.location.replace(res.data.session_url);
        } else {
          toast.error(res.data.message);
        }
      } else if (method === 'razorpay') {
        // Add currency field for Razorpay
        const res = await axios.post(
          `${backendUrl}/api/order/razorpay`,
          { ...orderData, currency: 'INR' },
          { headers: { token } }
        );

        if (res.data.success) {
          initPay(res.data.order);
        } else {
          toast.error(res.data.message);
        }
      } else {
        toast.warning('Unsupported payment method selected.');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Order submission failed.');
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left - Delivery Info */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input required name="firstName" value={formData.firstName} onChange={onChangeHandler} type="text" placeholder="First name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input required name="lastName" value={formData.lastName} onChange={onChangeHandler} type="text" placeholder="Last name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>

        <input required name="email" value={formData.email} onChange={onChangeHandler} type="email" placeholder="Email" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <input required name="street" value={formData.street} onChange={onChangeHandler} type="text" placeholder="Street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />

        <div className="flex gap-3">
          <input required name="city" value={formData.city} onChange={onChangeHandler} type="text" placeholder="City" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input required name="state" value={formData.state} onChange={onChangeHandler} type="text" placeholder="State" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>

        <div className="flex gap-3">
          <input required name="zipcode" value={formData.zipcode} onChange={onChangeHandler} type="text" placeholder="ZipCode" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input required name="country" value={formData.country} onChange={onChangeHandler} type="text" placeholder="Country" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>

        <input required name="phone" value={formData.phone} onChange={onChangeHandler} type="text" placeholder="Phone" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
      </div>

      {/* Right - Payment Section */}
      <div className="mt-8">
        <div className="min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-3 flex-col lg:flex-row">
            <PaymentOption selected={method === 'stripe'} onClick={() => setMethod('stripe')} logo={assets.stripe_logo} alt="Stripe" />
            <PaymentOption selected={method === 'razorpay'} onClick={() => setMethod('razorpay')} logo={assets.razorpay_logo} alt="Razorpay" />
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`} />
              <p className="text-gray-500 text-sm font-medium">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
};

const PaymentOption = ({ selected, onClick, logo, alt }) => (
  <div onClick={onClick} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
    <p className={`min-w-3.5 h-3.5 border rounded-full ${selected ? 'bg-green-400' : ''}`} />
    <img className="h-5 mx-4" src={logo} alt={alt} />
  </div>
);

export default PlaceOrder;
