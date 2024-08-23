import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useState } from 'react';
import { useEffect } from 'react';

const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

function App() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  const [data, setData] = useState([])
  useEffect(()=>{
    fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((data)=>{
      console.log(data)
      setData(data)
    })
  },[])

  return (
    <div className='w-3/4 m-auto'>
      <Slider {...settings}>
        {data.map((data)=>(
            <div key={data.category} className="bg-white h-[450px] text-black rounded-xl">
            <div className='h-56 bg-indigo-500 flex justify-center items-center rounded-t-xl'>
              <img src={data.image} alt="" className="h-44 w-44 rounded-full"/>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 p-4">
              <p className="text-xl font-semibold">{truncateText(data.title, 2)}</p>
              <p className="text-center">{truncateText(data.description, 15)}</p>
              <button className='bg-indataigo-500 text-white text-lg px-6 py-1 rounded-xl'>Read More</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default App;
