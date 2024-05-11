'use client'
import transcripcion from "../Transcripcion.json"
import Conversacion from "./Conversacion"
import AudioController from "./AudioController"
import { AudioProvider } from "@/context/AudioContext"

const AudioMessage = () => {

  const data = transcripcion
  const audioUrl = '/audio/testCall.wav'
  

  return (
    <div className="flex flex-col items-center">
      <AudioProvider audioUrl={audioUrl}>
        <Conversacion messages={data} />
        <AudioController />
      </AudioProvider>      
    </div>
  )
}

export default AudioMessage