import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// This is the main Page where the DOM Cretion Start
createRoot(document.getElementById("root")!).render(<App />);
