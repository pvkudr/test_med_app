// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import "./Notification.css"

// Function component Notification to display user notifications
const Notification = ({ children }) => {
  console.log("Notification is rendering");
  
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [appointmentData, setAppointmentData] = useState(null);

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Retrieve stored username, and appointment data (with doctor data) from sessionStorage and localStorage
    const storedUsername = sessionStorage.getItem('name');
    const storedAppointmentData = JSON.parse(localStorage.getItem('storageAppointmentData'));
    console.log('Notif_storedUsername = ', storedUsername);
    console.log('Notif_storedAppointmentData = ', storedAppointmentData);    

    // Set isLoggedIn state to true and update username if storedUsername exists
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } 

    // Set appointmentData state if storedAppointmentData exists
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    }
  }, []); 

  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      {/* Render Navbar component */}
      <Navbar ></Navbar>
      {/* Render children components */}
      {children}
      {/* Display appointment details if user is logged in and appointmentData is available */}
    
      {isLoggedIn && appointmentData && (
        <>
          <div className="appointment-card">
            <div className="appointment-card__content">
              {/* Display title for appointment details */}
              <h3 className="appointment-card__title">Appointment Details: </h3>
              <p className="appointment-card__message">
                {/* Display doctor's name from appointmentData */}
                <strong>Doctor:</strong> {appointmentData[0]?.doctorData?.name} <br></br>              
                <strong>Speciality:</strong> {appointmentData[0]?.doctorData?.speciality}<br></br> 
                <strong>Name:</strong> {appointmentData[0]?.name}<br></br> 
                <strong>Phone Number: </strong> {appointmentData[0]?.phoneNumber}<br></br> 
                <strong>Date of Appointment:</strong> {appointmentData[0]?.appointmentDate}<br></br> 
                <strong>Time Slot:</strong> {appointmentData[0]?.appointmentTime}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;