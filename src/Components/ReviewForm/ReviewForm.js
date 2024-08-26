import React, { useEffect, useState } from "react";
import "./ReviewForm.css";
import GiveReviews from "./GiveReviews";

const ReviewForm = () => {
  const [doctors, setDoctors] = useState([]);
  const reviewData = JSON.parse(localStorage.getItem("reviewData"));
    const [review, setReview] = useState(reviewData?reviewData:[]);

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

  const handleReviewSubmit = (reviewData) => {
    // const newData = {[userName]: reviewData}
    console.log("ReviewForm, reviewData", reviewData);
    console.log("ReviewForm, full reviewData", [...review, reviewData]);
    // TODO safe data in local storage
    localStorage.setItem("reviewData", JSON.stringify([...review, reviewData]));

    setReview((prevState) => [...prevState, reviewData]);
    // setReview(prevState => [...prevState, newData])
  };

  const doctorReviewCheck = (doctorName) => {
    const docWithReview = review.find(
      (element) => element.doctorName === doctorName
    );

    return docWithReview?.review;
  };

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
              <tr key={doctor.name}>
                <th>{index + 1}</th>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
                <td>
                  {" "}
                  {!doctorReviewCheck(doctor.name) && (
                    <GiveReviews
                      onbattonClick={handleReviewSubmit}
                      doctorName={doctor.name}
                      doctorSpeciality={doctor.speciality}
                    />
                  )}
                </td>
                <td>
                  {/* Display the submitted message if available */}
                  {doctorReviewCheck(doctor.name)?.length > 0 && (
                    <div>
                      <h3>Submitted Message:</h3>
                      <p>{doctorReviewCheck(doctor.name)}</p>
                    </div>
                  )}
                </td>
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
