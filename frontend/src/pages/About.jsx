import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetter from '../components/Newsletter';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="About us" />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            The sun dipped behind the hills, casting long shadows across the valley.
            Birds chirped softly as the breeze rustled through the tall grass.
            Everything felt still, as if the world paused for a quiet moment.
          </p>

          <p>
            He opened the dusty book and smiled at the faded handwriting inside.
            Each page held memories that had long been tucked away.
            With every word, the past came alive in his mind.
          </p>

          <b className='text-gray-800'>Our Mission</b>

          <p>
            Raindrops tapped gently against the windowpane, breaking the silence.
            A warm cup of tea steamed beside her as she read.
            Outside, the world blurred into shades of grey and green.
          </p>
        </div>
      </div>

      <div className=''>

        <Title text1={'WHY'} text2={'CHOOSE US'} />

      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>A soft glow filled the room as the candle flickered in the dark.
            She wrapped the blanket tighter, lost in the silence of midnight.
            The world outside faded, leaving her alone with her thoughts.</p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>The train rushed past, blurring faces and lights into streaks of color.
            He stood on the platform, clutching a letter in his hand.
            The weight of unspoken words pressed heavy on his chest.</p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600' >Leaves crunched under his boots as he wandered through the forest.
            The crisp air carried the scent of pine and distant rain.
            Every step forward felt like a journey into calm and clarity.

          </p>

        </div>
       

      </div>
       <NewsLetter />
    </div>
  );
};

export default About;
