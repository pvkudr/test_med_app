import React, { useEffect, useState } from "react";
import "./ReviewForm.css";

const ReviewForm = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctorsDetails = () => {
    fetch("https://api.npoint.io/9a5543d36f1460da2f63")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDoctorsDetails();
  }, []);

  return (
    <div className="review-container">
        <h1>Reviews</h1>
      {doctors.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>Provide feedback</th>
              <th>Review Given</th>
            </tr>
          </thead>
          <tbody>
            
              {doctors.map((doctor, index) => (
                <tr key = {doctor.name}>
                    <th>{index+1}</th>
                    <td>{doctor.name}</td>
                    <td>{doctor.speciality}</td>
                    <td><button> Click Here</button></td>
                    <td> ""</td>
                </tr>
               
              ))}
            
            {/* <tr>
              <th>#</th>
              <th>{doctors[1].name}</th>
              <th>Last</th>
              <td>
                <button> Click Here</button>
              </td>
              <th>Handle</th>
            </tr> */}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ReviewForm;
