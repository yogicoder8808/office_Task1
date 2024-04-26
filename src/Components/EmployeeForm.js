
// import React, { useState, useEffect } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Select, MenuItem, InputLabel, FormControl, Snackbar, Paper } from '@mui/material';
// import PhoneIcon from '@mui/icons-material/Phone';
// import EmailIcon from '@mui/icons-material/Email';
// import PersonIcon from '@mui/icons-material/Person';
// import GlobeIcon from '@mui/icons-material/Public'; 
// import MaleIcon from '@mui/icons-material/Male';
// import FemaleIcon from '@mui/icons-material/Female';
// import { AccountCircle, Edit, Close } from '@mui/icons-material'; 

// function EmployeeForm({ open, onClose, onSave, employee }) {
//   const [formData, setFormData] = useState({});
//   const [profilePhoto, setProfilePhoto] = useState('');
//   const [isProfilePicRemoved, setIsProfilePicRemoved] = useState(false);
//   const [notificationOpen, setNotificationOpen] = useState(false);

//   useEffect(() => {
//     if (employee) {
//       setFormData(employee);
//       setProfilePhoto(employee.profilePhoto || '');
//     } else {
//       setFormData({});
//       setProfilePhoto('');
//     }
//   }, [employee]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const trimmedValue = value.trim();
//     if ((name === 'firstName' || name === 'lastName') && trimmedValue.length > 20) {
//       return;
//     }
//     setFormData({ ...formData, [name]: trimmedValue });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePhoto(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemoveProfilePic = () => {
//     setProfilePhoto('');
//     setIsProfilePicRemoved(true);
//   };

 
//   const handleSave = () => {
//     const requiredFields = ['firstName', 'lastName', 'email', 'gender'];
//     const missingFields = requiredFields.filter(field => !formData[field]);
//     if (missingFields.length > 0) {
//       setNotificationOpen(true);
//     } else {
//       const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/; 
//       if (!emailRegex.test(formData.email)) {
//         window.alert('Please enter a valid email address ending with ".com"');
//         return;
//       }
  
//       if (formData.phoneNumber && formData.phoneNumber.length > 10) {
//         window.alert("Phone number must not exceed 10 digits and please don't include special characters");
//         return;
//       }
  
//       onSave({ ...formData, profilePhoto: isProfilePicRemoved ? '' : profilePhoto || employee?.profilePhoto, isProfilePicRemoved });
//       resetForm();
//       onClose();
//     }
//   };
  

//   const resetForm = () => {
//     setFormData({});
//     setProfilePhoto('');
//     setIsProfilePicRemoved(false);
//   };

//   const handleCancel = () => {
//     resetForm();
//     onClose();
//   };

//   const handleCloseNotification = () => {
//     setNotificationOpen(false);
//   };

//   return (
//     <Dialog open={open} onClose={handleCancel}>
//       <DialogTitle style={{ backgroundColor: '#3f51b5', color: 'white', textAlign: 'center' }}>
//         {employee ? <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Edit Employee</span> : <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Add New Employee</span>}
//       </DialogTitle>
//       <DialogContent>
//         <Paper variant="elevation" elevation={3} style={{ padding: '20px', backgroundColor: '#ecf0f3' }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} style={{ position: 'relative', textAlign: 'center' }}>
//               <label htmlFor="profile-photo-upload">
//                 <div style={{ position: 'relative', display: 'inline-block' }}>
//                   {profilePhoto ? (
//                     <>
//                       <img src={profilePhoto} alt="Profile" style={{ width: '100px', height: 'auto' }} />
//                       <Close onClick={handleRemoveProfilePic} color="error" style={{ position: 'absolute', bottom: '4px', left: '2px', backgroundColor: 'white', borderRadius: '30%' }} />
//                     </>
//                   ) : (
//                     <AccountCircle color="primary" style={{ fontSize: 120 }} />
//                   )}
//                   <Edit color="primary" style={{ position: 'absolute', bottom: '4px', right: '2px', backgroundColor: 'white', borderRadius: '30%' }} />
//                 </div>
//                 <input accept="image/*" style={{ display: 'none' }} id="profile-photo-upload" type="file" onChange={handleFileChange} />
//               </label>
//             </Grid>
//             <Grid item xs={12}>
//               <TextField label={<><PersonIcon /> First Name</>} name="firstName" value={formData.firstName || ''} onChange={handleChange} fullWidth required variant="outlined" color="primary" />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField label={<><PersonIcon /> Last Name</>} name="lastName" value={formData.lastName || ''} onChange={handleChange} fullWidth required variant="outlined" color="primary" />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField label={<><EmailIcon /> Email</>} name="email" value={formData.email || ''} onChange={handleChange} fullWidth required variant="outlined" color="primary" />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth required variant="filled" color="primary">
//                 <InputLabel id="gender-label">Gender</InputLabel>
//                 <Select
//                   labelId="gender-label"
//                   id="gender"
//                   name="gender"
//                   value={formData.gender || ''}
//                   onChange={handleChange}
//                 >
//                   <MenuItem value="Male"><MaleIcon /> Male</MenuItem>
//                   <MenuItem value="Female"><FemaleIcon /> Female</MenuItem>
//                   <MenuItem value="Other">Other</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={4}>
//               <FormControl fullWidth variant="filled" color="primary">
//                 <InputLabel id="country-code-label">Country Code</InputLabel>
//                 <Select
//                   labelId="country-code-label"
//                   id="countryCode"
//                   name="countryCode"
//                   value={formData.countryCode || ''}
//                   onChange={handleChange}
//                 >
//                   <MenuItem value="+91"><GlobeIcon /> +91 (India)</MenuItem>
//                   <MenuItem value="+1"><GlobeIcon /> +1 (USA)</MenuItem>
//                   <MenuItem value="+44"><GlobeIcon /> +44 (UK)</MenuItem>
//                   <MenuItem value="+61"><GlobeIcon /> +61 (Australia)</MenuItem>
//                   <MenuItem value="+86"><GlobeIcon /> +86 (China)</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={8}>
//               <TextField label={<><PhoneIcon /> Phone Number</>} name="phoneNumber" value={formData.phoneNumber || ''} onChange={handleChange} fullWidth variant="outlined" color="primary" />
//             </Grid>
//           </Grid>
//         </Paper>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleCancel}>Cancel</Button>
//         <Button onClick={handleSave} color="primary">{employee ? 'Save' : 'Add'}</Button>
//       </DialogActions>
//       <Snackbar
//         open={notificationOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseNotification}
//         message="Please fill in all required fields before saving."
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       />
//     </Dialog>
//   );
// }

// export default EmployeeForm;

import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Select, MenuItem, InputLabel, FormControl, Snackbar, Paper } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import GlobeIcon from '@mui/icons-material/Public'; 
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { AccountCircle, Edit, Close } from '@mui/icons-material'; 

function EmployeeForm({ open, onClose, onSave, employee }) {
  const [formData, setFormData] = useState({});
  const [profilePhoto, setProfilePhoto] = useState('');
  const [isProfilePicRemoved, setIsProfilePicRemoved] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  useEffect(() => {
    if (employee) {
      setFormData(employee);
      setProfilePhoto(employee.profilePhoto || '');
    } else {
      setFormData({});
      setProfilePhoto('');
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let trimmedValue = value.trim();

    // Apply character limit for first and last names
    if ((name === 'firstName' || name === 'lastName') && trimmedValue.length > 20) {
      return;
    }

    // Validate phone number
    if (name === 'phoneNumber') {
      // Check if value contains any non-digit characters
      if (/\D/.test(trimmedValue)) {
        window.alert('Phone number must only contain digits.');
        return;
      }
      // Limit to 10 digits
      trimmedValue = trimmedValue.slice(0, 10);
    }

    // Validate first name and last name
    if (name === 'firstName' || name === 'lastName') {
      // Check if value contains any digits
      if (/\d/.test(trimmedValue)) {
        window.alert('Name fields must not contain numbers.');
        return;
      }
      // Allow only alphabetic characters
      trimmedValue = trimmedValue.replace(/[^a-zA-Z]/g, '');
    }

    setFormData({ ...formData, [name]: trimmedValue });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveProfilePic = () => {
    setProfilePhoto('');
    setIsProfilePicRemoved(true);
  };

  const handleSave = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'gender'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      setNotificationOpen(true);
    } else {
      // Email validation with custom rule
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/; // Allow only .com addresses
      if (!emailRegex.test(formData.email)) {
        window.alert('Please enter a valid email address ending with ".com".');
        return;
      }

      // Phone number limit
      if (formData.phoneNumber && formData.phoneNumber.length !== 10) {
        window.alert('Phone number must be exactly 10 digits.');
        return;
      }

      onSave({ ...formData, profilePhoto: isProfilePicRemoved ? '' : profilePhoto || employee?.profilePhoto, isProfilePicRemoved });
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setFormData({});
    setProfilePhoto('');
    setIsProfilePicRemoved(false);
  };
  const handleCancel = () => {
    resetForm();
    onClose();
  };
  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle style={{ backgroundColor: '#3f51b5', color: 'white', textAlign: 'center' }}>
        {employee ? <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Edit Employee</span> : <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Add New Employee</span>}
      </DialogTitle>
      <DialogContent>
        <Paper variant="elevation" elevation={3} style={{ padding: '20px', backgroundColor: '#ecf0f3' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ position: 'relative', textAlign: 'center' }}>
              <label htmlFor="profile-photo-upload">
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  {profilePhoto ? (
                    <>
                      <img src={profilePhoto} alt="Profile" style={{ width: '100px', height: 'auto' }} />
                      <Close onClick={handleRemoveProfilePic} color="error" style={{ position: 'absolute', bottom: '4px', left: '2px', backgroundColor: 'white', borderRadius: '30%' }} />
                    </>
                  ) : (
                    <AccountCircle color="primary" style={{ fontSize: 120 }} />
                  )}
                  <Edit color="primary" style={{ position: 'absolute', bottom: '4px', right: '2px', backgroundColor: 'white', borderRadius: '30%' }} />
                </div>
                <input accept="image/*" style={{ display: 'none' }} id="profile-photo-upload" type="file" onChange={handleFileChange} />
              </label>
            </Grid>
            <Grid item xs={12}>
              <TextField label={<><PersonIcon /> First Name</>} name="firstName" value={formData.firstName || ''} onChange={handleChange} fullWidth required variant="outlined" color="primary" />
            </Grid>
            <Grid item xs={12}>
              <TextField label={<><PersonIcon /> Last Name</>} name="lastName" value={formData.lastName || ''} onChange={handleChange} fullWidth required variant="outlined" color="primary" />
            </Grid>
            <Grid item xs={12}>
              <TextField label={<><EmailIcon /> Email</>} name="email" value={formData.email || ''} onChange={handleChange} fullWidth required variant="outlined" color="primary" />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required variant="filled" color="primary">
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  name="gender"
                  value={formData.gender || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="Male"><MaleIcon /> Male</MenuItem>
                  <MenuItem value="Female"><FemaleIcon /> Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth variant="filled" color="primary">
                <InputLabel id="country-code-label">Country Code</InputLabel>
                <Select
                  labelId="country-code-label"
                  id="countryCode"
                  name="countryCode"
                  value={formData.countryCode || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="+91"><GlobeIcon /> +91 (India)</MenuItem>
                  <MenuItem value="+1"><GlobeIcon /> +1 (USA)</MenuItem>
                  <MenuItem value="+44"><GlobeIcon /> +44 (UK)</MenuItem>
                  <MenuItem value="+61"><GlobeIcon /> +61 (Australia)</MenuItem>
                  <MenuItem value="+86"><GlobeIcon /> +86 (China)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField label={<><PhoneIcon /> Phone Number</>} name="phoneNumber" value={formData.phoneNumber || ''} onChange={handleChange} fullWidth variant="outlined" color="primary" />
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave} color="primary">{employee ? 'Save' : 'Add'}</Button>
      </DialogActions>
      <Snackbar
        open={notificationOpen}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        message="Please fill in all required fields before saving."
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </Dialog>
  );
}
export default EmployeeForm;