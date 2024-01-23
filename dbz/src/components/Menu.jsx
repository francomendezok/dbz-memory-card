/* eslint-disable react/no-unescaped-entities */
import background from '../assets/gohan-ssj2.webp'
import background2 from '../assets/chamber.gif'
import background3 from '../assets/vegeta.gif'
import logo from '../assets/logo.png'
import play from '../assets/4.png'
import bulma from '../assets/bulma.webp'
import click from '../assets/click.png'
import './style.css'

import { useState, useEffect } from 'react';


const backgrounds = [background, background2, background3]


export default function Menu() {
  const [bgc, setBgc] = useState(backgrounds[0]);
  const [bulmaState, setBulmaState] = useState('hidden')

  function handleBulma () {
    bulmaState === 'hidden' ? setBulmaState('visible') : setBulmaState('hidden')
  }

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
  
  <div className="relative z-0 w-1/3 h-32 flex justify-center gap-12 items-center m-auto -mt-24">
    <img className="clickToPlay" src={click} alt="" />
    {/* <h1 style={{fontFamily: 'Saiyan'}} className='clickToPlay text-4xl text-black p-2 font-bold bg-white rounded-full'>Click the Dragon ball to Play!</h1> */}
    <img className='hover:scale-110 cursor-pointer w-24' src={play} alt="" />
  </div>
  
  <footer className='relative w-screen h-24 flex justify-between mt-auto'>
    <div className='volumeContainer flex justify-around w-1/5'>
      <button className='text-2xl hover:scale-110 rounded-full p-6 bg-slate-100 flex items-center h-12 m-auto'>🔊</button>
      <button className='text-2xl hover:scale-110 rounded-full p-6 bg-slate-100 flex items-center h-12 m-auto'>🎶</button>
    </div>
    <div className='instructionsContainer flex mr-10'>
    <div className={`relative bottom-48 flex h-72 w-3/4 ${bulmaState}`}>
        <img className='w-full h-full' src={bulma} alt="" />
        <div className='h-3/4 flex flex-col justify-evenly'>
          <p className='font-semibold rounded-lg p-2 bg-slate-200 text-center'>Don't click on the same card twice!</p>
          <p className='font-semibold rounded-lg p-2 bg-slate-200 text-center'>Click on the DBZ logo to go back.</p>
        </div>
      </div>
      <button onClick={handleBulma} className='text-2xl hover:scale-110 rounded-full p-6 bg-slate-100 h-12 flex items-center m-auto'>📜</button>
    </div>
  </footer>
</div>

  );
}

