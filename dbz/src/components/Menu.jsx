import background from '../assets/vegeta-rain.gif'
import music from '../assets/music.mp3'
import { useState } from 'react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <div>
      <h1>Reproductor de Audio</h1>
      <audio
        controls
        src={music} // Reemplaza con la URL real de tu archivo de audio
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        Tu navegador no soporta la etiqueta de audio.
      </audio>
      <p>{isPlaying ? 'Reproduciendo' : 'Detenido'}</p>
      <button onClick={togglePlay}>
        {isPlaying ? 'Pausar' : 'Reproducir'}
      </button>
    </div>
  );
};


export default function Menu () {
    return (
        <div>
            <img className='w-screen h-screen absolute' src={background}></img>
            <AudioPlayer />
        </div>
    )
}