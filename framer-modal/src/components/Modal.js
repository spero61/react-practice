import { motion } from 'framer-motion';
import Backdrop from './Backdrop';

const flip = {
  hidden: {
    transform: 'scale(0) rotateX(-360deg)',
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: ' scale(1) rotateX(0deg)',
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: 'scale(0) rotateX(360deg)',
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// const newspaper = {
//   hidden: {
//     transform: 'scale(0) rotate(720deg)',
//     opacity: 0,
//     transition: {
//       delay: 0.3,
//     },
//   },
//   visible: {
//     transform: ' scale(1) rotate(0deg)',
//     opacity: 1,
//     transition: {
//       duration: 0.5,
//     },
//   },
//   exit: {
//     transform: 'scale(0) rotate(-720deg)',
//     opacity: 0,
//     transition: {
//       duration: 0.3,
//     },
//   },
// };

const buttonStyle = {
  marginLeft: 'Auto',
  marginRight: '5px',
  color: '#3A3B3C',
  background: 'linear-gradient(15deg, salmon, hotpink)',
  padding: '10px',
  borderRadius: '45px',
};

const Modal = ({ handleClose, text }) => (
  <Backdrop onClick={handleClose}>
    <motion.div
      onClick={(e) => e.stopPropagation()}
      className="modal orange-gradient"
      variants={flip}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <p>{text}</p>
      <button style={buttonStyle} onClick={handleClose}>Close</button>
    </motion.div>
  </Backdrop>
);

export default Modal;
