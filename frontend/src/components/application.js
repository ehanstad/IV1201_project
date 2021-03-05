/**
 * @file React base Component
 * @requires react-router-dom
 * @author Erik Hanstad
 */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getCompetence, sendApplication } from '../redux/actions/applyActions';

function Application() {
  const [yoe, setYoe] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [availability, setAvailability] = useState([]);
  const [competences, setCompetence] = useState([]);
  const apply = useSelector((state) => state.apply);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  /*
   * changes the state for year of experience
   */
  const sendApply = () => {
    const { id } = user;
    dispatch(sendApplication({ competences, availability, id }));
  };

  /*
   * adds a availability state
   */
  const addAvailability = (newAvail) => setAvailability((state) => [...state, newAvail]);

  const addAvail = () => {
    addAvailability({ startDate, endDate });
    alert('Time slot added');
  };

  /*
   * adds a competence state
   */
  const addCompentence = (newComp) => setCompetence((state) => [...state, newComp]);

  const addCom = () => {
    const comp = document.getElementById('compSelect').value;
    addCompentence({ competence: comp, yoe });
    alert('competence added');
  };

  /*
   * If state apply does not exists the function get competence is called.
   */
  useEffect(() => {
    if (!apply.competence) {
      dispatch(getCompetence());
    }
  });

  let competenceForm = null;

  if (apply.competence) {
    competenceForm = (
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Control id="compSelect" as="select">
          {apply.competence.map((com) => (
            <option value={com.competence_id} key={com.competence_id}>
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

  return (
    <Card style={{ width: '40rem' }} className="mx-auto">
      <Card.Body>
        <Form onSubmit={sendApply}>
          <h2>Competence</h2>
          {competenceForm}
          <h2>Availability</h2>
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
          <Button type="submit">SUBMIT</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Application;
