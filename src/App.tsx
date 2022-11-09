import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Modal } from './components/modal/Modal'

function App() {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className="App">
      <button onClick={(): void => setOpen(true)}>Toggle</button>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>


      </Modal>
    </div>
  )
}

export default App
