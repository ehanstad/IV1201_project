/**
 * @file React base Component
 * @requires react-router-dom
 * @author Erik Hanstad
 */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Card, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getCompetence, sendApplication } from '../redux/actions/applyActions';
import Logout from './logout';

function Application() {
  const [yoe, setYoe] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [availability, setAvailability] = useState([]);
  const [competences, setCompetence] = useState([]);
  const [show, setShow] = useState(false);
  const [hasDispached, setHasDispached] = useState(false);
  const apply = useSelector((state) => state.apply);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /*
   * changes the state for year of experience
   */
  const sendApply = () => {
    const { id } = user;
    dispatch(sendApplication({ competences, availability, id }));
    setShow(false);
    window.location.reload();
  };

  /*
   * adds a availability state
   */
  const addAvailability = (newAvail) => setAvailability((state) => [...state, newAvail]);

  /*
   * formats a date object to form yyyy-mm-dd
   */
  const formatDate = (date) => {
    const d = new Date(date);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    const year = d.getFullYear();

    if (month.toString().length < 2) {
      month = `0${month}`;
    }
    if (day.toString().length < 2) {
      day = `0${day}`;
    }

    return [year, month, day].join('-');
  };

  const addAvail = () => {
    const sDate = formatDate(startDate);
    const eDate = formatDate(endDate);
    if (startDate > endDate) {
      alert('Invalid time slot');
    } else {
      addAvailability({ startDate: sDate, endDate: eDate });
      alert('Time slot added');
    }
  };

  /*
   * adds a competence state
   */
  const addCompentence = (newComp) => setCompetence((state) => [...state, newComp]);

  /*
   * adds a competence state if competence not already is added
   */
  const addCom = () => {
    const comp = document.getElementById('compSelect').value;
    let same = false;
    competences.map((com) => {
      if (com.competence === comp) {
        same = true;
      }
      return same;
    });
    if (!same) {
      addCompentence({ competence: comp, yoe });
      alert('competence added');
    } else {
      alert('competence already added');
    }
  };

  /*
   * If state apply does not exists the function get competence is called.
   */
  if (!hasDispached) {
    dispatch(getCompetence());
    setHasDispached(true);
  }

  let competenceForm = null;
  let selecedCompetences = null;
  let selectedAvailability = null;

  if (competences !== []) {
    selecedCompetences = competences.map((com) => (
      <p>
        {com.competence}, {com.yoe}
      </p>
    ));
  }

  if (availability !== []) {
    selectedAvailability = availability.map((avail) => (
      <p>
        {avail.startDate}, {avail.endDate}
      </p>
    ));
  }

  if (apply.competence) {
    competenceForm = (
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Control id="compSelect" as="select">
          {apply.competence.map((com) => (
            <option value={com.name} key={com.competence_id}>
              {com.name}
            </option>
          ))}
        </Form.Control>
        <Form.Control
          type="text"
          placeholder="Years of experience"
          onChange={(e) => setYoe(e.target.value)}
          style={{ margin: '5px', width: '11rem' }}
        />
        <Button onClick={addCom} type="button">
          Add competence
        </Button>
      </Form.Group>
    );
  }

  const sendModal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm application</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Is this information correct
        {selecedCompetences}
        {selectedAvailability}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={sendApply}>
          Yes, send.
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      <Card style={{ width: '40rem' }} className="mx-auto">
        <Card.Body>
          <Form>
            <h2>Competence</h2>
            {selecedCompetences}
            {competenceForm}
            <h2>Availability</h2>
            {selectedAvailability}
            <Form.Group>
              <Form.Group>
                <Form.Label style={{ padding: '5px' }}>From</Form.Label>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ padding: '10px' }}>To</Form.Label>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
              </Form.Group>
              <Button onClick={addAvail} type="button">
                Add availability
              </Button>
            </Form.Group>
            <Button onClick={handleShow}>SUBMIT</Button>
            <Logout />
          </Form>
        </Card.Body>
      </Card>
      {sendModal}
    </>
  );
}

export default Application;
