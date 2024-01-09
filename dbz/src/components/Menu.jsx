import background from '../assets/gohan-ssj2.webp'
import background2 from '../assets/chamber.gif'
import background3 from '../assets/vegeta.gif'
import logo from '../assets/logo.png'
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
    <div className="relative h-screen">
      <img className="absolute inset-0 w-full h-full object-cover z-0" src={bgc} alt="" />
      <img className="relative h-1/2 w-1/2 z-10 mx-auto" src={logo} alt="" />
    </div>
  );
}

