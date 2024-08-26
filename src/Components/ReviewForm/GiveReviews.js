// Following code has been commented with appropriate comments for your reference.
import React, { useState } from "react";
import "./ReviewForm.css";

// Function component for giving reviews
function GiveReviews({ onbattonClick, doctorName, doctorSpeciality }) {
  // State variables using useState hook
  const [showForm, setShowForm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 0,
    doctorName: doctorName,
    doctorSpeciality: doctorSpeciality,
    userName: sessionStorage.getItem('name')
  });

  // Function to handle button click event
  const handleButtonClick = () => {
    setShowForm(true);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    // Update the form data based on user input
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    onbattonClick(formData);
    setFormData({
      name: "",
      review: "",
      rating: 0,
      doctorName: doctorName,
      doctorSpeciality: doctorSpeciality,
      userName: sessionStorage.getItem('name')
    });
    // Check if all required fields are filled before submission
    if (formData.name && formData.review) {
      console.log("showForm", showForm);

      setShowWarning(false);
      setShowForm(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div>
      {/* <h4>Give a review</h4> */}
      {!showForm ? (
        // Display button to open the form
        <button onClick={handleButtonClick}>Click here</button>
      ) : (
        // Display form for giving feedback
        <form className="review-form" onSubmit={handleSubmit}>
          <h2>Give Your Feedback</h2>
          {/* Display warning message if not all fields are filled */}
          {showWarning && (
            <p className="warning">Please fill out all fields.</p>
          )}
          <div className="review-form_name_field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="review-form_review_field">
            <label htmlFor="review">Review:</label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
            />
          </div>
          <div className="review-form_rating_field">
            <label htmlFor="rating">Raiting:</label>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              list="markers"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            />
            <datalist id="markers">
              <option value="0"></option>
              <option value="1"></option>
              <option value="2"></option>
              <option value="3"></option>
              <option value="4"></option>
              <option value="5"></option>
            </datalist>
            <p>Raiting = {formData.rating} ⭐</p>
          </div>

          {/* Submit button for form submission */}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default GiveReviews;
