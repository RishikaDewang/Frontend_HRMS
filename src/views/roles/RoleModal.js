import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
import { useSpring, animated } from '@react-spring/web';
import { ToastContainer } from 'react-toastify';
import Permissions from './Permissions';
import { useState } from 'react';
import './style.css';
const Fade = React.forwardRef(function Fade(props, ref) {
  const { children, in: open, onClick, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });
  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});
Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};
export default function RoleModal({ isOpen, onRequestClose, onSave }) {
  const handleClose = () => onRequestClose();
  const [roleName, setRoleName] = useState(''); // State variable for Role Name
  const [description, setDescription] = useState('');
  return (
    <div> <ToastContainer/>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box className="role-modal-container">
            <div className="role-form-field">
              <label>Role Name:
                <input type="text"
                  className='input-box'
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)} /></label>
            </div>
            <div className="role-form-field">
              <label  >Description:
                <input type="text"
                className='input-box'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} /></label>
            </div>
            <Box > {/* Specify the desired height here */}
              <Permissions onSave={onSave} roleName={roleName} description={description} />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}