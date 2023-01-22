import Home from "./Home"
import Cuisine from "./Cuisine"
import { Routes, Route, useLocation} from 'react-router-dom'
import Searched from "./Searched"
import RecipeDetails from "./RecipeDetails"
import {AnimatePresence} from "framer-motion"

function Pages() {
  const location = useLocation()

  return (
    <AnimatePresence exitBeforeEnter >
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/cuisine/:type' element={<Cuisine />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/recipe/details/:title" element={<RecipeDetails />} />
      </Routes>
    </AnimatePresence>
  )
}

export default Pages
