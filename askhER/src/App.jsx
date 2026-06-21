import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

import HelloBeautifulPage from './pages/HelloBeautifulPage'
import FlowerGardenPage   from './pages/FlowerGardenPage'
import ProposalPage       from './pages/ProposalPage'
import IceCreamPage       from './pages/IceCreamPage'
import FoodPage           from './pages/FoodPage'
import MwahPage           from './pages/MwahPage'
import DateTimePage       from './pages/DateTimePage'
import CelebrationPage    from './pages/CelebrationPage'

import { AppStateProvider } from './hooks/useAppState'

export default function App() {
  const location = useLocation()

  return (
    <AppStateProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"            element={<HelloBeautifulPage />} />
          <Route path="/garden"      element={<FlowerGardenPage />} />
          <Route path="/proposal"    element={<ProposalPage />} />
          <Route path="/ice-cream"   element={<IceCreamPage />} />
          <Route path="/food"        element={<FoodPage />} />
          <Route path="/mwah"        element={<MwahPage />} />
          <Route path="/when"        element={<DateTimePage />} />
          <Route path="/celebration" element={<CelebrationPage />} />
          <Route path="*"            element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </AppStateProvider>
  )
}
