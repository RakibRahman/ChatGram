import { useState } from 'react'
import './App.css'
import { ChatRoom } from './components/ChatRoom'
import { ChatRoomData } from './context/context'

function App() {
  const [isOpen, setOpen] = useState(false)

  return (
    <ChatRoomData>
      <div className="App">
        <ChatRoom />
      </div>
    </ChatRoomData>
  )
}

export default App
