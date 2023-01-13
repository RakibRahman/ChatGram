import { useState } from 'react'
import './App.css'
import { ChatRoom } from './components/ChatRoom'
import { ChatRoomData } from './context/context'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ChatRoomDetails } from './components/ChatRoomDetails.tsx/ChatRoomDetails';

function App() {
  const [isOpen, setOpen] = useState(false)

  return (

    <Router>
      <ChatRoomData>
        <Routes>
          <Route path="/" element={<ChatRoom />} />
          <Route path=":chatRoomId" element={<ChatRoomDetails />} />

        </Routes>
      </ChatRoomData>
    </Router>

  )
}

export default App
