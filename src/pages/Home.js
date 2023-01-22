import Popular from "../components/Popular";
import Veggie from "../components/Veggie";
import {motion} from 'framer-motion';
import { useState } from "react";


const Home = () => {
 
  
  return (
    
      <motion.div
      animate={{opacity: 1}}
      intial={{opacity: 0}}
      exit={{opacity: 0}}
      transition={{duration: .5}}>
      
      <Veggie />
      <Popular />
    </motion.div>
    
    
  )
}

export default Home
