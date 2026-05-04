import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MyContextStates } from './myContext.tsx' // Path to your file

createRoot(document.getElementById('root')!).render(
    <MyContextStates>
       <App /> 
    </MyContextStates>
)
