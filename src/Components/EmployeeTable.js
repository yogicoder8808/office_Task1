import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Checkbox, Box, TablePagination, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { styled } from '@mui/system';
import { AccountCircle } from '@mui/icons-material'; 


const StyledHeaderTableCell = styled(TableCell)({
  fontWeight: 'bold',
  color: '#3f51b5', 
  padding: '16px', 
});

const StyledBodyTableCell = styled(TableCell)({
  padding: '16px', 
  textAlign: 'justify', 
});


const StyledIconButton = styled(IconButton)({
  margin: '0',
});

const StyledDeleteButton = styled(Button)({
  backgroundColor: '#f44336',
  color: 'white',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
});

function EmployeeTable({ employees, onEdit, onDelete, onAddEmployee }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleCheckboxChange = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...Array(employees.length).keys()]);
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length > 0) {
      const updatedEmployees = employees.filter((employee, index) => !selectedRows.includes(index));
      setSelectedRows([]);
      setSelectAll(false);
      onDelete(updatedEmployees);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', marginBottom: '40px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', backgroundColor: '#3f51b5', padding: '10px', borderRadius: '10px' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold', color: 'white', marginBottom: '10px', fontFamily: 'cursive' }}>Manage Employees</Typography>
        <Box>
          <Button variant="contained" color="primary" onClick={onAddEmployee} style={{ color: 'white', marginRight: '5px' }}>Add New Employee</Button>
          <StyledDeleteButton onClick={handleDeleteSelected} disabled={selectedRows.length === 0}>Delete Selected</StyledDeleteButton>
        </Box>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <StyledHeaderTableCell>Profile Photo</StyledHeaderTableCell>
              <StyledHeaderTableCell>Name</StyledHeaderTableCell>
              <StyledHeaderTableCell>Email</StyledHeaderTableCell>
              <StyledHeaderTableCell style={{ paddingLeft: '12px', paddingRight: '16px' }}>Gender</StyledHeaderTableCell>
              <StyledHeaderTableCell>Phone Number</StyledHeaderTableCell>
              <StyledHeaderTableCell>Action</StyledHeaderTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : employees
            ).map((employee, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(index + page * rowsPerPage)}
                    onChange={() => handleCheckboxChange(index + page * rowsPerPage)}
                  />
                </TableCell>
                <StyledBodyTableCell>
                  {employee.profilePhoto ? (
                    <img src={employee.profilePhoto} alt="Profile" style={{ width: '50px', height: 'auto' }} />
                  ) : (
                    <AccountCircle style={{ fontSize: '50px', color: '#bdbdbd' }} />
                  )}
                </StyledBodyTableCell>
                <StyledBodyTableCell>{employee.firstName} {employee.lastName}</StyledBodyTableCell>
                <StyledBodyTableCell>{employee.email}</StyledBodyTableCell>
                <StyledBodyTableCell>{employee.gender}</StyledBodyTableCell>
                <StyledBodyTableCell>{employee.countryCode && employee.phoneNumber ? `${employee.countryCode} ${employee.phoneNumber}` : (employee.phoneNumber || '-')}</StyledBodyTableCell> 
                <StyledBodyTableCell>
                  <StyledIconButton onClick={() => onEdit(index + page * rowsPerPage)} color="success" size="small">
                    <Edit />
                  </StyledIconButton>
                  <StyledIconButton onClick={() => onDelete(index + page * rowsPerPage)} color="error" size="small">
                    <Delete />
                  </StyledIconButton>
                </StyledBodyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default EmployeeTable;