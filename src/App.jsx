import { Routes, Route } from 'react-router-dom'
import Header from './components/globals/Header'
import Footer from './components/globals/Footer'
import { FormErrorProvider } from './context/formContext'
import Home from './pages/Home'
import Personal from './pages/Personal'
import Package from './pages/Package'
import Job from './pages/Job'
import Contact from './pages/Contact'

function App() {
  return (
    <div className="flex flex-col items-center justify-center md:pt-10 pt-15 font-share-tech">
      <FormErrorProvider>
        <Header className='self-start mt-25'/>
        <div className="flex flex-col items-center w-full justify-center md:mt-25 mt-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/package" element={<Package />} />
            <Route path="/job" element={<Job />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </FormErrorProvider>
    </div>
  )
}

export default App

