import { useAudio } from "@/context/AudioContext"
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AudioController = () => {

  const {togglePlay, restart, isPlaying} = useAudio()
  

  return (
    <div className="flex gap-1">
      <span onClick={restart} className="p-1 cursor-pointer w-[30px] text-gray-800 hover:text-gray-950"><FontAwesomeIcon icon={faStop} size="lg"/></span>
      <span onClick={togglePlay} className="p-1 cursor-pointer w-[30px] text-gray-800 hover:text-gray-950"><FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="lg"/></span>
    </div>
  )
}

export default AudioController