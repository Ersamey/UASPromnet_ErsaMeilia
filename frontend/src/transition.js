import { motion } from "framer-motion";

const Transition = ({ OgComponent }) => {
 return () => (
  <>
   <OgComponent />
   <motion.div
    className="slide-in"
    initial={{ scale: 0 }}
    animate={{ scale: 0 }}
    exit={{ scaleY: 1 }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
   />

   <motion.div
    className="slide-out"
    initial={{ scale: 1 }}
    animate={{ scale: 0 }}
    exit={{ scaleY: 0 }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
   />
  </>
 );
};

export default Transition;
