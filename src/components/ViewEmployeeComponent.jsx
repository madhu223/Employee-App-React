import React, { Component } from 'react';
import EmployeeService from '../servives/EmployeeService';

export class ViewEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      employee: {},
    };
  }
  componentDidMount() {
    EmployeeService.getEmployeeById(this.state.id).then((res) => {
      this.setState({ employee: res.data });
    });
  }
  render() {
    return (
      <div>
        <br />
        <div className='card  col-md-6 offset-md-d'>
          <h3 className='text-center'>View Employee Details</h3>
          <div className='card-body'>
            <div className='row'>
              <label>Employee FirstName:</label>
              <div style={{ marginLeft: '5px' }}>
                <b>{this.state.employee.firstName} </b>
              </div>
            </div>
            <div className='row'>
              <label>Employee LastName: </label>
              <div style={{ marginLeft: '5px' }}>
                <b>{this.state.employee.lastName} </b>
              </div>
            </div>
            <div className='row'>
              <label>Employee Email Id:</label>
              <div style={{ marginLeft: '5px' }}>
                <b> {this.state.employee.emailId} </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewEmployeeComponent;
