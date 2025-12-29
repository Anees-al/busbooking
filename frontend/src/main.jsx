import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ApiProvider } from './Context' 

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ApiProvider> 
      <App />
    </ApiProvider>
  </BrowserRouter>
)