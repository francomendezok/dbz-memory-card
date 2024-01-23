import background from '../assets/gohan-ssj2.webp'
import background2 from '../assets/chamber.gif'
import background3 from '../assets/vegeta.gif'
import logo from '../assets/logo.png'
import play from '../assets/4.png'
import { useState, useEffect } from 'react';


const backgrounds = [background, background2, background3]

export default function Menu() {
  const [bgc, setBgc] = useState(backgrounds[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBgc((prevBgc) => {
        const newIndex = (backgrounds.indexOf(prevBgc) + 1) % backgrounds.length;
        return backgrounds[newIndex];
      });
    }, 10000);

    return () => {
      // Limpiar el intervalo cuando el componente se desmonte para evitar fugas de memoria
      clearInterval(intervalId);
    };
  }, []); // El array vacío como segundo argumento asegura que el efecto se ejecute solo una vez al montar el componente

  return (
<div className="relative min-h-screen flex flex-col">
  <img className="absolute inset-0 w-full h-full object-cover z-0" src={bgc} alt="" />
  <img className="relative h-1/2 w-1/2 z-10 mx-auto" src={logo} alt="" />
  
  <div className="relative z-0 w-1/3 h-32 border-4 border-red-500 flex justify-center gap-4 items-center m-auto">
    <h1 className='text-2xl text-black font-bold'>Click the Dragon ball to Play!</h1>
    <img className='w-32' src={play} alt="" />
  </div>
  
  <footer className='relative w-screen h-24 flex justify-between mt-auto'>
    <div className='volumeContainer flex justify-around w-1/5'>
      <button className='text-2xl hover:scale-110 rounded-full p-8 bg-orange-700 flex items-center h-12 m-auto'>🔊</button>
      <button className='text-2xl hover:scale-110 rounded-full p-8 bg-orange-700 flex items-center h-12 m-auto'>🎶</button>
    </div>
    <div className='instructionsContainer flex mr-12'>
      <button className='text-2xl hover:scale-110 rounded-full p-8 bg-orange-700 h-12 flex items-center m-auto'>📜</button>
    </div>
  </footer>
</div>

  );
}

