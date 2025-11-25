import './App.css'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </Router>
  )
}

export default App
