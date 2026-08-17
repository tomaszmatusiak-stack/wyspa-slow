import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="min-h-full bg-gradient-to-b from-indigo-50 via-violet-50 to-sky-50">
      <App />
    </div>
  </StrictMode>,
)
