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
import { Button, Form } from 'react-bootstrap';
import { updateUserInfo } from '../redux/actions/updateActions';

class UpdateUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      password: '',
      ssn: '',
      username: '',
    };
  }

  /**
   * changes the state for the first name
   *
   * @param {input} e - The inputbox for the firstname
   */
  nameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  /**
   * changes the state for the surname
   *
   * @param {input} e - The inputbox for the surname
   */
  snameChange = (e) => {
    this.setState({ surname: e.target.value });
  };

  /**
   * changes the state for the social security number
   *
   * @param {input} e - The inputbox for the ssn
   */
  ssnChange = (e) => {
    this.setState({ ssn: e.target.value });
  };

  /**
   * changes the state for the username
   *
   * @param {input} e - The inputbox for the username
   */
  usernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  /**
   * changes the state for the password
   *
   * @param {input} e - The inputbox for the password
   */
  passwordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  update = (e) => {
    e.preventDefault();
    const { update } = this.props;
    const { email } = update.updateInfo;
    const { name, surname, password, ssn, username } = this.state;
    const { dispatchUpdateUserForm } = this.props;
    dispatchUpdateUserForm({ email, name, surname, password, ssn, username });
  };

  render() {
    const { update } = this.props;
    let form = null;
    if (update.updateInfo) {
      form = (
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={update.updateInfo.name}
            required
            onChange={this.nameChange}
          />
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder={update.updateInfo.surname}
            required
            onChange={this.snameChange}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required onChange={this.passwordChange} />
          <Form.Label>SSN</Form.Label>
          <Form.Control
            type="text"
            placeholder={update.updateInfo.ssn}
            required
            onChange={this.ssnChange}
          />
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder={update.updateInfo.username}
            required
            onChange={this.usernameChange}
          />
        </Form.Group>
      );
    }
    return (
      <Form onSubmit={this.update}>
        {form}
        <Button type="submit">UPDATE</Button>
      </Form>
    );
  }
}

UpdateUserForm.propTypes = {
  dispatchUpdateUserForm: PropTypes.func.isRequired,
  update: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  update: state.update,
});

export default connect(mapStateToProps, { dispatchUpdateUserForm: updateUserInfo })(UpdateUserForm);
