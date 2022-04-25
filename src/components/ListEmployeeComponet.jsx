import React, { Component } from 'react';
import EmployeeService from '../servives/EmployeeService';

class ListEmployeeComponet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
    };
    this.addEmployee = this.addEmployee.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }
  deleteEmployee(id) {
    EmployeeService.deleteEmployee(id).then((res) => {
      this.setState({
        employees: this.state.employees.filter(
          (employee) => employee.id !== id
        ),
      });
    });
  }
  viewEmployee(id) {
    this.props.history.push(`/view-employee/${id}`);
  }

  editEmployee(id) {
    this.props.history.push(`/add-employee/${id}`);
  }
  componentDidMount() {
    EmployeeService.getEmployees().then((res) => {
      this.setState({ employees: res.data });
    });
  }
  addEmployee() {
    this.props.history.push('/add-employee/_add');
  }
  render() {
    return (
      <div>
        <h2 className='text-center'>Employee LIst </h2>
        <div className='row'>
          <button
            className='btn btn-primary'
            onClick={this.addEmployee}
            style={{ marginBottom: '5px' }}
          >
            Add Employee
          </button>
        </div>
        <div className='row'>
          <table className='table table-striped table-bordered '>
            <thead>
              <tr>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName} </td>
                  <td>{employee.lastName} </td>
                  <td>{employee.emailId} </td>
                  <td>
                    <button
                      className='btn btn-info'
                      onClick={() => this.editEmployee(employee.id)}
                      style={{ margin: '10px' }}
                    >
                      Update
                    </button>
                    <button
                      style={{ margin: '10px' }}
                      className='btn btn-info'
                      onClick={() => this.deleteEmployee(employee.id)}
                    >
                      Delete
                    </button>
                    <button
                      style={{ margin: '10px' }}
                      className='btn btn-info'
                      onClick={() => this.viewEmployee(employee.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListEmployeeComponet;
