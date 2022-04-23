import axios from 'axios';

const Employee_Base_URL = 'http://localhost:8080/api/v1/employees';
class EmployeeService {
  getEmployees() {
    return axios.get(Employee_Base_URL);
  }
  createEmployee(employee) {
    return axios.post(Employee_Base_URL, employee);
  }
  getEmployeeById(employeeId) {
    return axios.get(Employee_Base_URL + '/' + employeeId);
  }
  updateEmployee(employee, employeeId) {
    return axios.put(Employee_Base_URL + '/' + employeeId, employee);
  }
  deleteEmployee(employeeId) {
    return axios.delete(Employee_Base_URL + '/' + employeeId);
  }
}

export default new EmployeeService();
