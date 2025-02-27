import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AppProvider from './Context/AppContext.jsx'
import { AudioPlayerProvider } from './Context/AudioPlayerContext.jsx'

createRoot(document.getElementById('root')).render(
  <AudioPlayerProvider>
    <StrictMode>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </StrictMode>
  </AudioPlayerProvider>
);
