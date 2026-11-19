import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// les fonts du site
import '@fontsource-variable/dm-sans'
import '@fontsource/cormorant-garamond/300-italic.css'
import '@fontsource/cormorant-garamond/400-italic.css'
import './index.css'
import App from './App.jsx'

// React start ici
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
