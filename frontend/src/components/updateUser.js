/**
 * @file React Component responseble for updating old user
 * information
 * @requires react-redux
 * @requires prop-types
 * @requires react-bootstrap
 * @author Erik Hanstad
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { updateInfo } from '../redux/actions/authActions';
import UpdateUserForm from './updateUserForm';
import { UPDATEINFO_FAIL } from '../redux/types';

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: null,
    };
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === UPDATEINFO_FAIL) {
        this.fail();
      }
    }
  }

  fail = () => {
    this.setState({ message: 'Could not find user with written email' });
  };

  /**
   * changes the state for the password
   *
   * @param {input} e - The inputbox for the password
   */
  emailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  /**
   * gets the user from the corresponding email
   *
   * @param {button} e - The forms submit buttom
   */
  getUser = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { dispatchOldUser } = this.props;
    dispatchOldUser({ email });
  };

  render() {
    const { message } = this.state;
    const { auth } = this.props;

    return (
      <Card style={{ width: '40rem' }} className="mx-auto">
        <Card.Body>
          <h2>UPDATE OLD USER</h2>
          {message ? (
            <Alert variant="danger" color="danger">
              {message}
            </Alert>
          ) : null}
          {auth.updateInfo ? (
            <UpdateUserForm />
          ) : (
            <Form onSubmit={this.getUser}>
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
            </Form>
          )}
          <Button variant="link" href="./registration">
            Create a new account.
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

UpdateUser.propTypes = {
  dispatchOldUser: PropTypes.func.isRequired,
  error: PropTypes.shape.isRequired,
  auth: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.error,
  auth: state.auth,
});

export default connect(mapStateToProps, { dispatchOldUser: updateInfo })(UpdateUser);
