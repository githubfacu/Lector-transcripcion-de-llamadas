import React, { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

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

  useEffect(() => {
    const newAudio = new Audio(audioUrl);
    setAudio(newAudio)
  }, [])

  const restart = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);      
    }
  };

  const togglePlay = () => {

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

    const timer = setTimeout(() => {
      audio.pause()
      setIsPlaying(false);
    }, duracion* 1000)    

    audio.onended = () => {
      restart()
    };

    return () => clearTimeout(timer)      
    }
  };


  return (
    <AudioContext.Provider value={{ playAudio, togglePlay, restart, isPlaying}}>
      {children}
    </AudioContext.Provider>
  )
}