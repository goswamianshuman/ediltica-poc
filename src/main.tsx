import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ThemeLayout from './components/layout/theme-layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeLayout>
      <App />
    </ThemeLayout>
  </StrictMode>,
)
