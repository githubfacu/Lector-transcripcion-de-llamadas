import React, { FC, PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react';

type AudioContextType = {
  isPlaying: boolean
  playAudio: (inicio: number, fin: number) => void;
  togglePlay: () => void;
  restart: () => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

type AudioProviderProps = PropsWithChildren & {
  audioUrl: string
}

export const AudioProvider: FC<AudioProviderProps> = ({ children, audioUrl }) => {
  
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [pausas, setPausas] = useState<boolean>(false)
  const [luces, setLuces] = useState<number>(0)


  useEffect(() => {
    const newAudio = new Audio(audioUrl);
    setAudio(newAudio)
  }, [])

  useEffect(() => {
    setLuces(prev => prev + 1)
  }, [pausas])

  const restart = () => {
    setPausas(!pausas)
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);      
    }
  };

  const togglePlay = () => {
    setPausas(!pausas)

    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);

      audio.onended = () => {
        restart()
      };      
    }
  };

  const playAudio = (inicio: number, fin: number) => {

    setPausas(!pausas)

    if (audio) {
    const duracion = fin - inicio

    if (isPlaying === true) {
      audio.pause();
      audio.currentTime = inicio;
      audio.play();
    } else {
      audio.currentTime = inicio;
      audio.play();
    }
    setIsPlaying(true);


    audio.onended = () => {
      restart()
    };

    // setTimeout(() => {
    //   if (luces === lucesInicial) {
    //   audio.pause();
    //   setIsPlaying(false);
    //   }
    // }, duracion * 1000);

    }
  };


  return (
    <AudioContext.Provider value={{ playAudio, togglePlay, restart, isPlaying}}>
      {children}
    </AudioContext.Provider>
  )
}