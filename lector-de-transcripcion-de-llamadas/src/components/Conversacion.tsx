import { useAudio } from "@/context/AudioContext"
import { MessageType } from "@/types/Transcripcion.Types"


type ConversacionProps = {
  messages: MessageType[]
}

const Conversacion = ({messages}: ConversacionProps) => {
    
  const {playAudio} = useAudio()

  return (
    <div>
        {
          messages.map((message, index) => (
            <div key={index}>
              <p className="cursor-pointer" 
              onClick={() => playAudio(message.start, message.end)}>{message.content}</p>
            </div>
          ))
        }
    </div>
  )
}

export default Conversacion