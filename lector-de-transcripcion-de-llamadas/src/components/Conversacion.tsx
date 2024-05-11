import { useAudio } from "@/context/AudioContext"
import { MessageType } from "@/types/Transcripcion.Types"


type ConversacionProps = {
  messages: MessageType[]
}

const Conversacion = ({messages}: ConversacionProps) => {
    
  const {playAudio} = useAudio()

  return (
    <div className="flex flex-col gap-2 mb-4">
        {
          messages.map((message, index) => (
            <div key={index}>
              <p className={`${message.role === 'agent'? ' bg-slate-300' : 'bg-slate-100'} cursor-pointer rounded`}
              onClick={() => playAudio(message.start, message.end)}>{message.content}</p>
            </div>
          ))
        }
    </div>
  )
}

export default Conversacion