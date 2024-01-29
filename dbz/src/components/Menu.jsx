/* eslint-disable react/no-unescaped-entities */
import background from '../assets/gohan-ssj2.webp'
import background2 from '../assets/chamber.gif'
import background3 from '../assets/vegeta.gif'
import logo from '../assets/logo.png'
import play from '../assets/4.png'
import bulma from '../assets/bulma.webp'
import click from '../assets/click.png'
import audio from '../assets/music.mp3'
import disco from '../assets/vinil.webp'
import confuso from '../assets/confuso.webp'
import card from '../assets/card.jpg'
import './style.css'
import { useState, useEffect, useRef } from 'react';

const backgrounds = [background, background2, background3]

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const imgElement = document.getElementById('dancingImage');
    if (imgElement) {
      if (isPlaying) {
        imgElement.classList.add('dancing'); // Añade la clase cuando está reproduciéndose
      } else {
        imgElement.classList.remove('dancing'); // Elimina la clase cuando está pausado
      }
    }
  }, [isPlaying]);


  return (
    <div className='flex w-1/2'>
      <img 
      onClick={handlePlayPause} 
      id='dancingImage'
      className={`mt-auto h-32 w-32 hover:scale-110 cursor-pointer ${isPlaying ? 'dancing' : ''}`} 
      src={disco} 
      alt="Goku Vinyl"
       />
      <div className='hidden'>
        <audio ref={audioRef} controls>
          <source src={audio} type="audio/mp3" />
        </audio>
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pausar' : 'Reproducir'}
        </button>
      </div>
    </div>
  );
};

const Bulma = () => {
  const [bulmaState, setBulmaState] = useState('hidden')
  function handleBulma () {
    bulmaState === 'hidden' ? setBulmaState('visible') : setBulmaState('hidden')
  }

  return (
    <div className='instructionsContainer flex mr-10'>
        <div className={`relative bottom-32 flex h-72 w-3/4 ${bulmaState}`}>
          <img className='w-1/2 h-full' src={bulma} alt="" />
          <div className='h-3/4 flex flex-col justify-evenly'>
            <p className='font-semibold rounded-lg p-2 bg-slate-200 text-center'>Don't click on the same card twice!</p>
            <p className='font-semibold rounded-lg p-2 bg-slate-200 text-center'>Click on the DBZ logo to go back.</p>
          </div>
        </div>
        <img className='h-32 mt-auto mb-2 cursor-pointer hover:scale-110 ease-in-out' onClick={handleBulma} src={confuso} alt="" />    
      </div>
  )
}

function Footer () {
  return (
    <footer className='relative w-screen h-44 flex justify-between mt-auto'>
      <AudioPlayer/>
      <Bulma />
  </footer>
  )
}

const fetchData = async () => {
  try {
    const response = await fetch('https://dragonball-api.com/api/characters?page=1&limit=58');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function Game ({quantity}) {
  const imageElements = [];
  const random = randomCharacters(quantity)
    for (let i = 0; i < quantity; i++) {
    const key = `card-${i}`;

    // Agregar cada elemento <img> al array
    imageElements.push(<img className='shenron' key={key} src={random[i].image} alt={`Card ${i + 1}`} />);
  }

  return (
    <div className='space absolute w-screen h-screen flex items-center justify-center'>
      <div id='cards' className='flex items-center justify-center w-full h-2/4'>
        {imageElements.map((image, index) => (
          <div key={index} className='w-1/4 flex justify-center'> 
            {image}
          </div>
        ))}
        <h1 className='absolute bottom-32 text-4xl text-slate-100'> 0 / {quantity}</h1>
      </div>
    </div>
  );
  
}

function randomCharacters (amount) {
  let positions = []

  for (let i = 0; i < amount; i++) {
    let index = Math.floor(Math.random() * 59); 
    // if (!positions.includes(characters.items[index])) 
    positions.push(characters.items[index])
    // else {
    //     while (positions.includes(characters.items[index])) {
    //       let index = Math.floor(Math.random() * 59);
    //       positions.push(characters.items[index])
    //   }
    // }
  }
  console.log(positions);
  return positions;
}

const characters = await fetchData();


function Menu () {
  const [bgc, setBgc] = useState(backgrounds[0]);
  const [logoState, setLogoState] = useState(true)
  const [chooseLevel, setChooseLevel] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [quantity, setQuantity] = useState(1)



  function playGame () {
    setChooseLevel(true)
    setLogoState(false)
  }

  function showMenu () {
    setChooseLevel(false)
    setLogoState(true)
    setShowGame(false)
  }

  function printCards (number) {
    setQuantity(number)
    setShowGame(true)
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
    <div className={`relative min-h-screen flex flex-col`}>
      <img className={`absolute inset-0 w-full h-full object-cover z-0 ${showGame ? 'hidden' : ''}`} src={bgc} alt="" />
      <img onClick={showMenu} className={`cursor-pointer relative h-1/2 w-1/2 z-10 bottom-24 mx-auto ${logoState ? '' : 'top-2 right-1/3 h-1/5 w-1/5'}`} src={logo} alt="" />
      
      <div className={`relative z-0 w-1/3 h-32 bottom-24 flex justify-center gap-12 items-center m-auto ${logoState || showGame ? '' : 'hidden'}`}>
        <img className={`clickToPlay ${showGame ? 'hidden' : ''}`} src={click} alt="" />
        <img onClick={playGame} id='dragonBall' className={`hover:scale-110 cursor-pointer w-24 ${showGame ? 'hidden' : ''}`} src={play} alt="" />
      </div>

      {showGame ? <Game quantity={quantity} /> : ''}

      <div className={`relative z-0 w-1/2 h-32 flex justify-evenly gap-12 items-center m-auto ${!chooseLevel || showGame ? 'hidden' : ''}`}>
        <button onClick={() => printCards(5)} style={{fontFamily:'Saiyan'}} className='p-6 rounded-md text-6xl bg-green-800 text-white shadow-lg cursor-pointer hover:scale-110'>Easy</button>
        <button onClick={() => printCards(7)} style={{fontFamily:'Saiyan'}} className='p-6 rounded-md text-6xl bg-orange-800 text-white shadow-lg cursor-pointer hover:scale-110'>Medium</button>
        <button onClick={() => printCards(10)} style={{fontFamily:'Saiyan'}} className='p-6 rounded-md text-6xl bg-red-800 text-white shadow-lg cursor-pointer hover:scale-110'>Hard</button>
      </div>
      
      <Footer />

    </div>

  );
}


export {Menu}



