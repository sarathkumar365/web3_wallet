
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Link , useNavigate} from 'react-router-dom';
import App from './App.jsx'
import './index.css'



createRoot(document.getElementById('root')).render(
<Router>
     <App />
</Router>
)
