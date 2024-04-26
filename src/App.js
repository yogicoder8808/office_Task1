import React, { useState } from 'react';
import EmployeeTable from './Components/EmployeeTable';
import EmployeeForm from './Components/EmployeeForm';

function App() {
  const [employees, setEmployees] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const handleEdit = (index) => {
    setEditIndex(index);
    setOpenFormDialog(true);
  };

  const handleDelete = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  const handleAdd = () => {
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    setEditIndex(null);
  };

  const handleSaveEmployee = (data) => {
    const isDuplicate = employees.some(
      (employee, index) =>
        index !== editIndex &&
        employee.firstName === data.firstName &&
        employee.lastName === data.lastName &&
        employee.email === data.email &&
        employee.gender === data.gender &&
        employee.countryCode === data.countryCode &&
        employee.phoneNumber === data.phoneNumber
    );
  
    if (isDuplicate) {
      window.alert("Duplicate employee details are not allowed.");
    } else {
      if (editIndex !== null) {
        const updatedEmployees = [...employees];
        if (data.isProfilePicRemoved) {
          data.profilePhoto = '';
        }
        updatedEmployees[editIndex] = data;
        setEmployees(updatedEmployees);
      } else {
        setEmployees([...employees, data]);
      }
      setOpenFormDialog(false);
      setEditIndex(null);
    }
  };
  
  
  return (
    <div>
      <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} onAddEmployee={handleAdd} />
      <EmployeeForm open={openFormDialog} onClose={handleCloseFormDialog} onSave={handleSaveEmployee} employee={employees[editIndex]} />
    </div>
  );
}

export default App;
