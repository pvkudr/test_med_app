import React, { useState } from "react";

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber, appointmentDate, appointmentTime});
    setName("");
    setPhoneNumber("");
    setAppointmentDate("");
    setAppointmentTime("")
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date of Appointment:</label>
        <input
          type="date"
          id="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
      <label htmlFor="time">Book Time Slot :</label>
      <select
        classNamne="form-select"
        id= "time"
        aria-label="Default select example"
        value={appointmentTime}
        onChange={(e) => setAppointmentTime(e.target.value)}
        required
      >
        <option selected>Select a time slot :</option>
        <option value="8:00 - 8:30">8:00 - 8:30</option>
        <option value="8:30 - 9:00">8:30 - 9:00</option>
        <option value="9:00 - 9:30">9:00 - 9:30</option>
        <option value="10:00 - 10:30">10:00 - 10:30</option>
        <option value="10:30 - 11:00">10:30 - 11:00</option>
        <option value="11:00 - 11:30">11:00 - 11:30</option>
      </select>
</div>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentForm;
