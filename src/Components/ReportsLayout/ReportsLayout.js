import React, { useEffect, useState, useRef } from "react";
import "./ReportsLayout.css"
// import pdfFile from '../../../public/patient_report.pdf'

const ReportsLayout = () => {
  // TODO - report is not review, + delete all unnesesary staff
  const reviewData = JSON.parse(localStorage.getItem("reviewData"));

  const [showPdf, setShowPdf] = useState(false);
  const objectRef = useRef(null);

  // CLICK VIEW REPORT
  const handleViewClick = () => {
    setShowPdf(true);
    console.log("handleViewClick is working");
  };

  // CLICK outside to close the window
  const handleClickOutside = (event) => {
    if (objectRef.current && !objectRef.current.contains(event.target)) {
      setShowPdf(false);
    }
  };
  useEffect(() => {
    if (showPdf) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPdf]);

  // end

  return (
    <div className="review-container">
      <h1>Reports</h1>
      {reviewData.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {reviewData.map((review, index) => (
              <tr key={review.name + index}>
                <th>{index + 1}</th>
                <td>{review.doctorName}</td>
                <td>{review.doctorSpeciality}</td>
                <td>
                  <button onClick={handleViewClick}>View Report</button>
                </td>
                <td>
                  <a href ="/patient_report.pdf" download ="report.pdf" className="download_button">Download Report</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Reports so far</p>
      )}
      {showPdf && (
        // <iframe
        //   src="test.html"
        // //   scr ="/patient_report.pdf"// Use `require` to get the URL
        //   style={{ height: "100vh", width: "100%", border: "none" }}
        //   title="PDF Viewer"
        // ></iframe>
        <object
        className="view_area"
          ref={objectRef}
          data="/patient_report.pdf"
          type="application/pdf"
          width="100%"
          height="500px"
        >
          <p>
            Your browser does not support PDFs.{" "}
            <a href="/patient_report.pdf">Download the PDF</a>.
          </p>
        </object>
      )}
    </div>
  );
};

export default ReportsLayout;
