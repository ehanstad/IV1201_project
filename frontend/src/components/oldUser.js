/**
 * @file React base Component
 * @requires react-router-dom
 * @author Erik Hanstad
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Alert, Form, Card } from 'react-bootstrap';
import { updateInfo } from '../redux/actions/authActions';
import { UPDATEINFO_FAIL } from '../redux/types';

class OldUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false,
      info: null,
    };
  }

  componentDidUpdate(prevProps) {
    const { error, auth } = this.props;
    const { loading } = this.state;
    if (error !== prevProps.error) {
      if (error.id === UPDATEINFO_FAIL) {
        this.fail();
      }
    }
    if (loading) {
      this.setInfo(auth);
    }
  }

  fail = () => {
    this.setState({ info: 'Could not find user with written email' });
  };

  setInfo = (auth) => {
    this.setState({ info: auth.updateInfo });
  };

  /**
   * changes the state for the emial
   *
   * @param {input} e - The inputbox for the email
   */
  emailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  /**
   * placeholder
   *
   * @param {button} e - The forms submit buttom
   */
  update = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { dispatchOldUser } = this.props;
    this.setState({ loading: true });
    dispatchOldUser({ email });
  };

  render() {
    const { info } = this.state;
    return (
      <Card style={{ width: '40rem' }} className="mx-auto">
        <Card.Body>
          <h2>UPDATE OLD USER</h2>
          {info ? (
            <Alert variant="danger" color="danger">
              {info}
            </Alert>
          ) : null}
          <Form onSubmit={this.update}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                required
                onChange={this.emailChange}
              />
            </Form.Group>
            <Button type="submit">UPDATE</Button>
            <Button variant="link" href="./registration">
              Create a new account.
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

OldUser.propTypes = {
  dispatchOldUser: PropTypes.func.isRequired,
  error: PropTypes.shape.isRequired,
  auth: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { dispatchOldUser: updateInfo })(OldUser);
