import React, { Component } from 'react';
import EmployeeService from '../servives/EmployeeService';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  // console.log(formErrors);

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    // console.log(val);
    if (val.length > 0) {
      valid = false;
    }
    // val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    // console.log(val);
    if (val === null) {
      valid = false;
    }
    // val === null && (valid = false);
  });

  return valid;
};

export class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      firstName: '',
      lastName: '',
      emailId: '',
      formErrors: {
        firstName: '',
        lastName: '',
        emailId: '',
      },
    };
    // this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    // this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    // this.changeEmailHandler = this.changeEmailHandler.bind(this);

    this.handleChange = this.handleChange.bind(this);

    this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
  }
  componentDidMount() {
    if (this.state.id === '_add') {
      return;
    } else {
      EmployeeService.getEmployeeById(this.state.id).then((res) => {
        let employee = res.data;
        this.setState({
          firstName: employee.firstName,
          lastName: employee.lastName,
          emailId: employee.emailId,
        });
      });
    }
  }

  saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    // console.log(this.state);
    // console.log(this.state.firstName);
    // console.log(e);

    //aa
    // const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    let valid = true;
    const { firstName, lastName, emailId } = e.target;
    if (firstName.value === null || firstName.value.length < 3) {
      formErrors.firstName = 'minimum 3 characaters required';
      valid = false;
    }
    if (lastName.value === null || lastName.value.length < 3) {
      formErrors.lastName = 'minimum 3 characaters required';
      valid = false;
    }
    if (emailId.value === null || emailRegex.test(emailId.value)) {
      formErrors.emailId = 'invalid email address';
      valid = false;
    }

    //adada

    if (formValid(this.state)) {
      // if (valid) {
      let employee = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailId: this.state.emailId,
      };
      console.log('employee =>' + JSON.stringify(employee));

      if (this.state.id === '_add') {
        EmployeeService.createEmployee(employee).then((res) => {
          this.props.history.push('/employees');
        });
      } else {
        EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
          this.props.history.push('/employees');
        });
      }
    }
  };
  // changeFirstNameHandler = (event) => {
  //   this.setState({ firstName: event.target.value });
  // };
  // changeLastNameHandler = (event) => {
  //   this.setState({ lastName: event.target.value });
  // };
  // changeEmailHandler = (event) => {
  //   this.setState({ emailId: event.target.value });
  // };
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case 'firstName':
        formErrors.firstName =
          value.length < 3 ? 'minimum 3 characaters required' : '';
        break;
      case 'lastName':
        formErrors.lastName =
          value.length < 3 ? 'minimum 3 characaters required' : '';
        break;
      case 'emailId':
        formErrors.emailId = emailRegex.test(value)
          ? ''
          : 'invalid email address';
        break;

      default:
        break;
    }

    // this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    this.setState({ formErrors, [name]: value });
  };

  cancel() {
    this.props.history.push('/employees');
  }

  getTitle() {
    if (this.state.id === '_add') {
      return <h3 className='text-center'>Add Employee </h3>;
    } else {
      return <h3 className='text-center'>Update Employee </h3>;
    }
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
              {this.getTitle()}
              <div className='card-body'>
                <form onSubmit={this.saveOrUpdateEmployee}>
                  <div className='from-group'>
                    <label>First Name</label>
                    <input
                      type='text'
                      name='firstName'
                      placeholder='First Name'
                      className='form-control'
                      value={this.state.firstName}
                      onChange={this.handleChange}
                      required
                    />
                    {formErrors.firstName.length > 0 && (
                      <span className='errorMessage'>
                        {formErrors.firstName}
                      </span>
                    )}
                  </div>
                  <div className='from-group'>
                    <label>Last Name</label>
                    <input
                      type='text'
                      name='lastName'
                      placeholder='Last Name'
                      className='form-control'
                      value={this.state.lastName}
                      onChange={this.handleChange}
                      required
                    />
                    {formErrors.lastName.length > 0 && (
                      <span className='errorMessage'>
                        {formErrors.lastName}
                      </span>
                    )}
                  </div>
                  <div className='from-group'>
                    <label>Email Id: </label>
                    <input
                      name='emailId'
                      placeholder='Email Address'
                      className='form-control'
                      value={this.state.emailId}
                      onChange={this.handleChange}
                      required
                    />
                    {formErrors.emailId.length > 0 && (
                      <span className='errorMessage'>{formErrors.emailId}</span>
                    )}
                  </div>
                  <button
                    type='submit'
                    className='btn btn-success'
                    // onClick={this.saveOrUpdateEmployee}
                  >
                    Save
                  </button>
                  <button
                    className='btn btn-danger'
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: '10px' }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEmployeeComponent;
