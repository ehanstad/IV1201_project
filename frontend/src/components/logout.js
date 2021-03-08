/**
 * @file Logout component
 * @requires react
 * @author Lucas Villarroel
 */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { logout } from '../redux/actions/authActions';

function Logout() {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = () => {
    dispatch(logout());
    setShow(false);
    window.location.reload();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Logout
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to logout? Any changes you have made will be discarded.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Yes, logout.
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Logout;
