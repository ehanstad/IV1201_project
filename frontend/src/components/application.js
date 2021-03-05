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
import { getCompetence } from '../redux/actions/applyActions';

function Application() {
  const [yoe, setYoe] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [competence, setCompetence] = useState('');
  const apply = useSelector((state) => state.apply);
  const dispatch = useDispatch();

  console.log(competence);
  console.log(yoe);
  /*
   * changes the state for year of experience
   * @param {Object} e - the input for year of experince
   */
  const sendApply = () => {
    // dispatch(sendApplication({ competences, startDate, endDate }));
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
        <Form.Label>Example select</Form.Label>
        <Form.Control as="select">
          {apply.competence.map((com) => (
            <option onClick={(e) => setCompetence(e.target.value)} value={com.competence_id}>
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
        <Button type="button">Add comptence</Button>
      </Form.Group>
    );
  }

  return (
    <Card style={{ width: '40rem' }} className="mx-auto">
      <Card.Body>
        <Form onSubmit={sendApply()}>
          <Form.Label>Competence</Form.Label>
          {competenceForm}
          <Form.Group>
            <Form.Label>Availabile</Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>From</Form.Label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>To</Form.Label>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          </Form.Group>
          <Button type="submit">SUBMIT</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Application;
